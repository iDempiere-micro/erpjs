'use strict'

import {IsReadableStream, ReadChunkFromStream} from '@smcloudstore/core/dist/StreamUtils'
import {WaitPromise} from '@smcloudstore/core/dist/Utils'
import {Readable, Stream} from 'stream'

/**
 * Manages the upload of objects to Backblaze B2.
 * 
 * This supports using Buffers and strings with the "simple APIs". It supports streams too, using either the "simple APIs" if the stream is less than `chunkSize`, or the large file APIs otherwise. The selection happens automatically.
 */
class B2Upload {
    /**
     * Size of each chunk that is uploaded when using B2's large file APIs, in bytes. Minimum value is 5MB; default is 9MB.
     * 
     * Note: there seems to be a bug in the current version of the backblaze-b2 package when the request body upload is > 10 MB, because of a downstream dependency on axios@0.17; once backblaze-b2 updates its dependency on axios, this might be fixed.
     */
    static chunkSize = 9 * 1024 * 1024

    /** Backblaze recommends retrying all uploads at least two times (up to five) in case of errors, with an incrementing delay. We're retrying all uploads 3 times by default. */
    static retries = 3

    /** Instance of the B2 client library */
    protected client: any

    /** Id of the target bucket */
    protected bucketId: string

    /** Path where to store the object, inside the container */
    protected path: string

    /** Data to upload */
    protected data: Stream|string|Buffer

    /** Metadata for the object */
    protected metadata: any

    /** Length (in bytes) of the input data */
    protected length: number

    /**
     * Initializes a new B2Upload class
     * 
     * @param client - Instance of the B2 client library. It's expected authorization to be completed already, so auth data is stored in the library.
     * @param bucketId - Id of the target bucket
     * @param path - Path where to store the object, inside the container
     * @param data - Data to upload
     * @param metadata - Metadata for the object
     * @param length - Length (in bytes) of the input data
     */
    constructor(client: any, bucketId: string, path: string, data: Stream|string|Buffer, metadata?: any, length?: number) {
        // Store all arguments as properties
        this.client = client
        this.bucketId = bucketId
        this.path = path
        this.data = data
        this.metadata = metadata || {}
        this.length = length || 0
    }

    /**
     * Start the upload of the object
     * 
     * @returns Promise that resolves when the object has been uploaded
     * @async
     */
    start(): Promise<void> {
        // Check if we have a string or a Buffer, and proceed straight to the upload phase
        if (typeof this.data == 'string' || (typeof this.data == 'object' && Buffer.isBuffer(this.data))) {
            // Convert strings to Buffers
            if (typeof this.data == 'string') {
                this.data = Buffer.from(this.data as string, 'utf8')
            }

            // Ensure length (in bytes) is less than 5GB
            if (this.data.byteLength > 5 * 1024 * 1024 * 1024) {
                throw Error('Maximum size for strings and Buffers is 5 GB')
            }

            // Upload the file, returning the Promise
            return this.putFile()
        }

        // At this point, we should only have streams
        if (!IsReadableStream(this.data)) {
            throw Error('putObject requires a Stream, a Buffer or a string')
        }

        // First, ensure that chunkSize is at least 5MB
        if (B2Upload.chunkSize < 5 * 1024 * 1024) {
            throw Error('chunkSize must be at least 5MB')
        }

        // Peek the first chunk from the stream (note this returns a Promise)
        return ReadChunkFromStream(this.data as Readable, B2Upload.chunkSize + 1, true)
            .then((firstChunk: Buffer) => {
                // If we don't have a length argument specified, get the length of the first chunk
                if (!this.length) {
                    if (!firstChunk || !firstChunk.byteLength) {
                        throw Error('First chunk read from the stream has zero length')
                    }

                    this.length = firstChunk.byteLength
                }

                // Check if the length is not longer than chunkSize: if it is, just upload the Buffer as a single file
                // While B2 large file APIs support files that are at least 5 MB + 1 byte, we are splitting the data into chunkSize chunks, so there's no point in using the more complex API in case it's smaller
                if (this.length <= B2Upload.chunkSize) {
                    // Returns a Promise
                    return this.putFile(firstChunk)
                }
                else {
                    // If we're still here, then we need to upload the file using the large file APIs
                    // Returns a Promise
                    return this.putLargeFile()
                }
            })
    }

    /**
     * Uploads a single file, when data is a Buffer or string.
     * 
     * @param data - Data to upload, as Buffer. If not specified, will use `this.data`
     * @returns Promise that resolves when the object has been uploaded
     * @async
     */
    private putFile(data?: Buffer): Promise<any> {
        // If we are not passed a Buffer, use this.data
        if (!data) {
            data = this.data as Buffer
        }

        // Ensure that data is a Buffer
        if (!data || typeof data != 'object' || !Buffer.isBuffer(data)) {
            throw Error('Argument data must be a Buffer')
        }

        // Counter for re-trying uploads if there's an error
        let retryCounter = 0

        const doUpload = () => {
            // First, get the upload url and upload authorization token
            return this.client.getUploadUrl(this.bucketId)
            // Then upload the file
            .then((response) => {
                if (!response || !response.data || !response.data.authorizationToken || !response.data.uploadUrl) {
                    throw Error('Invalid response when requesting the upload url and upload authorization token')
                }

                // Request args
                const requestArgs = {
                    data: data,
                    filename: this.path,
                    info: {} as any,
                    mime: 'application/octet-stream',
                    uploadAuthToken: response.data.authorizationToken,
                    uploadUrl: response.data.uploadUrl
                }

                // Metadata
                if (this.metadata) {
                    // Add custom headers
                    // Maximum 10 headers, and they can only contain [A-Za-z0-9]
                    // If headers don't start with 'X-Bz-Info-', the prefix will be added
                    let i = 0
                    for (const key in this.metadata) {
                        if (!this.metadata.hasOwnProperty(key)) {
                            continue
                        }

                        // Content-Type header has a special treatment
                        if (key && key.toLowerCase() == 'content-type') {
                            requestArgs.mime = this.metadata[key]
                        }
                        else {
                            // We can't have more than 10 headers
                            if (i == 10) {
                                throw Error('Cannot send more than 10 custom headers')
                            }

                            // Ensure the key is valid
                            if (!key.match('^[A-Za-z0-9\-]+$')) {
                                throw Error('Invalid header format: must be A-Za-z0-9')
                            }

                            // Check if the prefix is there already
                            if (key.substr(0, 10) != 'X-Bz-Info-') {
                                requestArgs.info['X-Bz-Info-' + key] = this.metadata[key]
                            }
                            else {
                                requestArgs.info[key] = this.metadata[key]
                            }

                            // Increment the counter
                            i++
                        }
                    }
                }

                // Send the request
                return this.client.uploadFile(requestArgs)
            })
            .catch((err) => {
                if (retryCounter < B2Upload.retries) {
                    retryCounter++
                    // Before retrying, wait for an increasing delay
                    return WaitPromise((retryCounter + 1) * 500)
                        .then(() => {
                            return doUpload()
                        })
                }
                else {
                    // Let the error bubble up
                    throw err
                }
            })
        }
        return doUpload()
    }

    /**
     * Uploads a Readable Stream.
     * 
     * @param stream - Readable Stream containing the data to upload
     * @returns Promise that resolves when the object has been uploaded
     * @async
     */
    private putLargeFile(stream?: Readable): Promise<any> {
        // If we are not passed a stream, use this.data
        if (!stream) {
            stream = this.data as Readable
        }
        // Ensure stream is a Readable Stream
        if (!IsReadableStream(stream)) {
            throw Error('Argument stream must be a Readable Stream')
        }

        // Add a listener to understand when the stream ends
        let streamEnded = false
        stream.on('end', () => {
            streamEnded = true
        })

        // Will contain fileId
        let fileId = null

        // Returns a chunk at a time
        const readChunk = (partNumber: number, hashes: string[]): Promise<{fileId: string, hashes: string[]}> => {
            // If the stream has ended, return
            if (streamEnded) {
                return Promise.resolve({fileId: fileId, hashes: hashes})
            }

            // Returns a Promise
            return ReadChunkFromStream(stream, B2Upload.chunkSize)
                .then((data: Buffer) => {
                    // If we have no data, we reached the end of the stream
                    if (!data) {
                        return {fileId: fileId, hashes: hashes}
                    }
                    else {
                        return this.putPart(fileId, partNumber, data)
                            .then((response) => {
                                // Check response
                                if (!response || !response.data) {
                                    throw Error('Invalid response when uploading a part')
                                }
                                if (!response.data.fileId || response.data.fileId != fileId) {
                                    throw Error('fileId for uploaded part does not match')
                                }
                                if (response.data.partNumber === undefined || response.data.partNumber != partNumber) {
                                    throw Error('partNumber for uploaded part does not match')
                                }
                                if (!response.data.contentLength) {
                                    throw Error('Invalid contentLength of uploaded part')
                                }
                                if (!response.data.contentSha1) {
                                    throw Error('Invalid contentSha1 of uploaded part')
                                }

                                // Add the SHA1 hash to the list
                                hashes.push(response.data.contentSha1)

                                // Read the next chunk
                                return readChunk(partNumber + 1, hashes)
                            })
                    }
                })
        }

        // Start processing the file
        return Promise.resolve()
            // First step: request the fileId
            .then(() => {
                let contentType = 'application/octet-stream'

                // Metadata
                // When using the large file API, we can't add custom headers, so we're only looking for Content-Type (case-insensitive)
                if (this.metadata) {
                    for (const key in this.metadata) {
                        if (!this.metadata.hasOwnProperty(key)) {
                            continue
                        }

                        const keyLowerCase = key.toLowerCase()
                        if (keyLowerCase == 'content-type') {
                            contentType = this.metadata[key]
                            break
                        }
                    }
                }

                return this.client.startLargeFile({
                    bucketId: this.bucketId,
                    contentType: contentType,
                    fileName: this.path
                })
            })
            // Second step: upload all parts
            .then((response) => {
                if (!response || !response.data || !response.data.fileId) {
                    throw Error('Invalid response when requesting the file id')
                }

                fileId = response.data.fileId as string

                // Read from stream into chunks of chunkSize
                // partNumber starts from 1
                // Pass an empty array where all the SHA1 hashes are collected
                return readChunk(1, [])
            })
            // Last: commit the file
            .then((result) => {
                return this.client.finishLargeFile({
                    fileId: result.fileId,
                    partSha1Array: result.hashes
                })
            })
            // In case of errors, if we have a fileId, remove the incomplete upload
            .catch((err) => {
                // In all situations, just re-throw the error as callback
                const cb = () => {
                    throw err
                }

                if (fileId) {
                    return this.client.cancelLargeFile({fileId: fileId})
                        .then(cb, cb)
                }
                else {
                    cb()
                }
            })
    }

    /**
     * Uploads a single part of a large file.
     * 
     * @param fileId - ID of the large file that is being uploaded
     * @param partNumber - Number of the part, starting from 1
     * @param data - Data to upload, in a Buffer
     * @returns Promise that resolves when the part has been uploaded.
     * @async
     */
    private putPart(fileId: string, partNumber: number, data: Buffer): Promise<any> {
        // Backblaze recommends retrying at least two times (up to five) in case of errors, with an incrementing delay. We're retrying all uploads 3 times
        let retryCounter = 0

        const doUpload = () => {
            // First, get the upload part url and upload authorization token
            return this.client.getUploadPartUrl({fileId: fileId})
            .then((response) => {
                if (!response || !response.data || !response.data.authorizationToken || !response.data.uploadUrl) {
                    throw Error('Invalid response when requesting the upload part url and upload authorization token')
                }

                // Upload the part
                return this.client.uploadPart({
                    data: data,
                    partNumber: partNumber,
                    uploadAuthToken: response.data.authorizationToken,
                    uploadUrl: response.data.uploadUrl
                })
            })
            .catch((err) => {
                if (retryCounter < B2Upload.retries) {
                    retryCounter++
                    // Before retrying, wait for an increasing delay
                    return WaitPromise((retryCounter + 1) * 500)
                        .then(() => {
                            return doUpload()
                        })
                }
                else {
                    // Let the error bubble up
                    throw err
                }
            })
        }
        return doUpload()
    }
}

export = B2Upload
