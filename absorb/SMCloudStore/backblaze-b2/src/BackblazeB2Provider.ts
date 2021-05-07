'use strict'

import {ListItemObject, ListItemPrefix, ListResults, PutObjectOptions, StorageProvider} from '@smcloudstore/core/dist/StorageProvider'
import {Stream} from 'stream'
import B2Upload = require('./B2Upload')
// tslint:disable-next-line:no-var-requires
const B2 = require('backblaze-b2') as any

/**
 * Connection options for a Backblaze B2 provider.
 */
interface BackblazeB2ConnectionOptions {
    /** Account Id */
    accountId: string
    /** Application key (secret key) */
    applicationKey: string
}

/**
 * Options passed when creating a container
 */
interface BackblazeB2CreateContainerOptions {
    /** Determine access level for all files in the container. Defaults to 'private' if not specified */
    access?: 'public' | 'private'
}

/** Dictionary of options used when putting an object. Many providers will extend this. */
interface BackblazeB2PutObjectOptions extends PutObjectOptions {
    /** When passing a stream as `data` object, being able to specify the length of the data allows for faster uploads; this argument is ignored if `data` is not a Stream object */
    length?: number
}

/**
 * Client to interact with Backblaze B2 cloud storage.
 */
class BackblazeB2Provider extends StorageProvider {
    /** Specifies for how long (in ms) to keep BucketId data in cache. Set to 0 to disable caching. Default is 15 minutes. */
    static bucketIdCacheDuration = 900000

    protected _client: any
    private _isAuthorized: boolean
    private _bucketIdCache: {[s: string]: {result: string, time: number}}

    /**
     * Initializes a new client to interact with Backblaze B2.
     * 
     * @param connection - Dictionary with connection options.
     */
    constructor(connection: BackblazeB2ConnectionOptions) {
        if (!connection || !Object.keys(connection).length) {
            throw new Error('Connection argument is empty')
        }

        super(connection)

        // Authorization for B2 is asynchronous, so will be executed on the first async call
        this._isAuthorized = false

        // Provider name
        this._provider = 'backblaze-b2'

        // Initialize the bucket ID cache
        this._bucketIdCache = {}

        // The B2 library will validate the connection object
        this._client = new B2(connection)
    }

    /**
     * Create a container ("bucket") on the server.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the access level
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    createContainer(container: string, options?: BackblazeB2CreateContainerOptions): Promise<void> {
        const access = (options && options.access && options.access == 'public')
            ? 'allPublic'
            : 'allPrivate'

        // Ensure we are authorized, then perform the request
        return this._ensureAuthorized()
            .then(() => this._client.createBucket(container, access))
    }

    /**
     * Check if a container exists.
     * 
     * @param container - Name of the container
     * @returns Promises that resolves with a boolean indicating if the container exists.
     * @async
     */
    isContainer(container: string): Promise<boolean> {
        // There's no method in the B2 APIs to get a single bucket, so list all buckets and look for the one we're interested in
        return this.listContainers()
            .then((list) => {
                return list.indexOf(container) >= 0
            })
    }

    /**
     * Create a container ("bucket") on the server if it doesn't already exist.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the access level
     * @returns Promise that resolves once the container has been created
     * @async
     */
    ensureContainer(container: string, options?: BackblazeB2CreateContainerOptions): Promise<void> {
        return this.isContainer(container).then((exists) => {
            if (!exists) {
                return this.createContainer(container)
            }
        })
    }

    /**
     * Lists all containers belonging to the user
     * 
     * @returns Promise that resolves with an array of all the containers
     * @async
     */
    listContainers(): Promise<string[]> {
        // Ensure we are authorized, then perform the request
        return this._ensureAuthorized()
            .then(() => this._client.listBuckets())
            .then((response) => {
                if (!response || !response.data || !response.data.buckets || !Array.isArray(response.data.buckets)) {
                    return []
                }

                // Return only the bucketName element from the array of objects
                return response.data.buckets.map((el) => (el && el.bucketName) || undefined)
            })
    }

    /**
     * Removes a container from the server
     * 
     * @param container - Name of the container
     * @returns Promise that resolves once the container has been removed
     * @async
     */
    deleteContainer(container: string): Promise<void> {
        // Request the bucketId for the container, after ensuring that we're authorized
        return Promise.resolve()
            .then(() => this._ensureAuthorized())
            .then(() => this._getBucketId(container))
            .then((bucketId) => {
                if (!bucketId) {
                    throw Error('Container not found: ' + container)
                }

                return this._client.deleteBucket(bucketId)
            })
            .then(() => {
                // Return void
                return
            })
    }

    /**
     * Uploads a stream to the object storage server.
     * 
     * The Backblaze B2 APIs have relatively poor support for streams, as it requires the size of the data to be sent at the beginning of the request. As a consequence, this method will upload the file using a different API based on the input data:
     * 
     * 1. If the length of the data can be known before the upload starts, makes a single upload call. This applies to all situations when `data` is a Buffer or a string, and when `data` is a Stream and either the `options.length` argument is specified, or `data.byteLength` is defined (all data is loaded in memory before being sent to the server in this case).
     * 2. In the situation when `data` is a Stream and the length can't be known beforehand, if the data is longer than `B2Upload.chunkSize` (default: 9MB; minimum: 5MB) the method will use B2's [large files APIs](https://www.backblaze.com/b2/docs/large_files.html). With those, it's possible to chunk the file into many chunks and upload them separately, thus it's not necessary to load the entire Stream in memory. However, this way of uploading files requires many more network calls, and could be significantly slower. B2 supports up to 1,000 chunks per object, so using 9MB chunks (the default value for `B2Upload.chunkSize`), maximum file size is 90GB.
     * 
     * Notes on the metadata:
     * 
     * - The `Content-Type` header is always supported and used as-is
     * - When using the large file APIs, no other custom header can be added
     * - When using the "normal APIs", you can add up to 10 custom headers, all starting with the `X-Bz-Info-` prefix (if your headers don't start with this prefix, it will be added automatically)
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param data - Object data or stream. Can be a Stream (Readable Stream), Buffer or string.
     * @param options - Key-value pair of options used by providers, including the `metadata` dictionary. For the Backblaze B2 provider, this object contains the `length` property too, which is useful when passing a stream as data object, as it might allow for faster uploads.
     * @returns Promise that resolves once the object has been uploaded
     * @async
     */
    putObject(container: string, path: string, data: Stream|string|Buffer, options?: BackblazeB2PutObjectOptions): Promise<void> {
        if (!options) {
            options = {}
        }
        return Promise.resolve()
            // Step zero: ensure we're authorized
            .then(() => this._ensureAuthorized())
            // First step: get the bucketId for the container
            // This also calls _ensureAuthorized
            .then(() => this._getBucketId(container))
            // Initialize the B2Upload class and start the upload process
            .then((bucketId) => {
                const uploader = new B2Upload(this._client, bucketId, path, data, options.metadata, options.length)
                // This returns a promise
                return uploader.start()
            })
    }

    /**
     * Requests an object from the server. The method returns a Promise that resolves to a Readable Stream containing the data.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @returns Readable Stream containing the object's data
     * @async
     */
    getObject(container: string, path: string): Promise<Stream> {
        return this._ensureAuthorized()
            .then(() => {
                // Request the file
                return this._client.downloadFileByName({
                        bucketName: container,
                        fileName: path,
                        responseType: 'stream'
                    })
                    .then((response) => {
                        // The stream is in response.data
                        if (!response || !response.data) {
                            throw Error('Invalid response when requesting the object')
                        }

                        return response.data
                    })
            })
    }

    /**
     * Returns a list of objects with a given prefix (folder). The list is not recursive, so prefixes (folders) are returned as such.
     * 
     * @param container - Name of the container
     * @param prefix - Prefix (folder) inside which to list objects
     * @returns List of elements returned by the server
     * @async
     */
    listObjects(container: string, prefix?: string): Promise<ListResults> {
        // We might need to do multiple requests if there are many files in the bucket that match the prefix
        const list = [] as ListResults
        const requestList = (bucketId: string, startFileName: string): Promise<ListResults> => {
            return this._client.listFileNames({
                    bucketId: bucketId,
                    delimiter: '/',
                    maxFileCount: 1000,
                    prefix: prefix || '',
                    startFileName: startFileName
                })
                .then((response) => {
                    if (!response || !response.data || !response.data.files) {
                        throw Error('Invalid response when listing the container')
                    }

                    // Iterate through the response and add everything to the list
                    for (const file of response.data.files) {
                        // If we have a file
                        if (file && file.action == 'upload') {
                            list.push({
                                contentType: file.contentType,
                                lastModified: new Date(file.uploadTimestamp),
                                path: file.fileName,
                                size: file.contentLength
                            } as ListItemObject)
                        }
                        else if (file && file.action == 'folder') {
                            list.push({
                                prefix: file.fileName
                            } as ListItemPrefix)
                        }
                    }

                    // Check if we have to make another request, or just return the list
                    if (response.data.nextFileName) {
                        return requestList(bucketId, response.data.nextFileName)
                    }
                    else {
                        return list
                    }
                })
        }

        // Request the bucketId for the container first (after ensuring that we're authorized)
        return Promise.resolve()
            .then(() => this._ensureAuthorized())
            .then(() => this._getBucketId(container))
            .then((bucketId) => {
                if (!bucketId) {
                    throw Error('Container not found: ' + container)
                }

                // Request the full list (which might require multiple network calls), then return it
                return requestList(bucketId, null)
            })
    }

    /**
     * Removes an object from the server
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @returns Promise that resolves once the object has been removed
     * @async
     */
    deleteObject(container: string, path: string): Promise<void> {
        // Request the bucketId for the container first, after ensuring we're authorized
        return Promise.resolve()
            .then(() => this._ensureAuthorized())
            .then(() => this._getBucketId(container))
            .then((bucketId) => {
                if (!bucketId) {
                    throw Error('Container not found: ' + container)
                }

                // Get the fileId
                return this._getFileId(bucketId, path)
            })
            .then((fileId) => {
                if (!fileId) {
                    throw Error('File not found: ' + container)
                }

                // Delete the file, returning a promise
                return this._client.deleteFileVersion({
                    fileId: fileId,
                    fileName: path
                })
            })
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use to request an object from the server with a GET request, even if the object is private.
     * 
     * **Backblaze B2 currently does not support this API**, and calling this method will always throw an error. Sorry!
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedGetUrl(container: string, path: string, ttl?: number): Promise<string> {
        throw Error('Presigned URLs are not supported by the BackblazeB2 Provider')
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
     * 
     * **Backblaze B2 currently does not support this API**, and calling this method will always throw an error. Sorry!
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param options - Key-value pair of options used by providers, including the `metadata` dictionary
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedPutUrl(container: string, path: string, options?: PutObjectOptions, ttl?: number): Promise<string> {
        throw Error('Presigned URLs are not supported by the BackblazeB2 Provider')
    }

    /**
     * Returns the bucketId property for a given bucket name, as most B2 methods require a bucket's ID.
     * 
     * The result is cached in memory for a certain amount of time configured with `BackblazeB2Provider.bucketIdCacheDuration` (default: 15 minutes), and up to 100 IDs.
     * 
     * @param bucketName - Name of the bucket
     * @returns Promise that resolves with the bucketId
     * @async
     */
    private _getBucketId(bucketName: string): Promise<string> {
        // First, check if the data is cached, and the cache hasn't expired
        // (If caching is enabled at all)
        const cachingEnabled = BackblazeB2Provider.bucketIdCacheDuration && BackblazeB2Provider.bucketIdCacheDuration > 0
        if (cachingEnabled
            && this._bucketIdCache[bucketName]
            && (Date.now() - this._bucketIdCache[bucketName].time <  BackblazeB2Provider.bucketIdCacheDuration)
        ) {
            return Promise.resolve(this._bucketIdCache[bucketName].result)
        }

        // There's no method in the B2 APIs to get a single bucket, so we need to request the full list
        return Promise.resolve()
            .then(() => this._client.listBuckets())
            .then((response) => {
                if (!response || !response.data || !response.data.buckets || !Array.isArray(response.data.buckets)) {
                    return null
                }

                // Look for the bucket with the requested name, then return the id
                for (const el of response.data.buckets) {
                    if (el.bucketName == bucketName) {
                        // If caching is enabled, store the result
                        if (cachingEnabled) {
                            this._bucketIdCache[bucketName] = {
                                result: el.bucketId,
                                time: Date.now()
                            }
                            // If there are more than 100 elements in the cache, remove the first ones
                            // This should be in order with ES2015
                            const keys = Object.keys(this._bucketIdCache)
                            if (keys.length > 100) {
                                delete this._bucketIdCache[keys.shift()]
                            }
                        }
                        return el.bucketId as string
                    }
                }

                // Couldn't find the bucket
                return null
            })
    }

    /**
     * Returns the fileId property for a given file name, as some B2 methods require a file's ID
     * 
     * @param bucketId - ID of the bucket
     * @param fileName - Name of the file
     * @returns Promise that resolves with the fileId
     * @async
     */
    private _getFileId(bucketId: string, fileName: string): Promise<string> {
        // There's no method in the B2 APIs to get a single file, so we need to request the list and use the file name as prefix
        // No caching here, as this is expect to be more volatile data
        return this._client.listFileNames({
                bucketId: bucketId,
                delimiter: '/',
                maxFileCount: 1000,
                prefix: fileName
            })
            .then((response) => {
                if (!response || !response.data || !response.data.files || !Array.isArray(response.data.files)) {
                    return null
                }

                // Should match a single file with the exact name
                for (const file of response.data.files) {
                    if (file && file.fileName == fileName) {
                        return file.fileId
                    }
                }

                // Couldn't find the file
                return null
            })
    }

    /**
     * Performs authorization
     * 
     * @returns Promise that resolves once the client is authorized
     * @async
     */
    private _ensureAuthorized(): Promise<void> {
        if (this._isAuthorized) {
            return Promise.resolve()
        }
        else {
            return this._client.authorize()
        }
    }
}

export = BackblazeB2Provider
