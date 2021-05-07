'use strict'

import {CreateBucketRequest, CreateWriteStreamOptions, GetFilesOptions, Storage} from '@google-cloud/storage'
import {ListItemObject, ListItemPrefix, ListResults, PutObjectOptions, StorageProvider} from '@smcloudstore/core/dist/StorageProvider'
import {IsStream} from '@smcloudstore/core/dist/StreamUtils'
import {Duplex, Stream} from 'stream'

/**
 * Connection options for a Google Cloud Storage provider.
 */
interface GoogleCloudConnectionOptions {
    /** ID of the Google Cloud project */
    projectId: string
    /** Path of the JSON file containing the keys */
    keyFilename: string
}

/**
 * Options passed when creating a container
 */
interface GoogleCloudCreateContainerOptions {
    /** Storage class to use. Defaults to 'multi_regional' */
    class?: 'multi_regional' | 'regional' | 'nearline' | 'coldline'

    /** Region in which to create the container (or multi-regional location if using multi_regional storage). Defaults to 'us' is class is 'multi_regional'; 'us-central1' otherwise. */
    region?: string
}

/**
 * Client to interact with Google Cloud Storage.
 */
class GoogleCloudStorageProvider extends StorageProvider {
    protected _client: Storage

    /**
     * Initializes a new client to interact with Minio.
     * 
     * @param connection - Dictionary with connection options.
     */
    constructor(connection: GoogleCloudConnectionOptions) {
        super(connection)

        // Provider name
        this._provider = 'google-cloud-storage'

        // Check if we have a connection
        if (!connection || !Object.keys(connection).length) {
            // We might have auth data passed via environmental variables, which will be picked up by the library
            if (!process.env.GCLOUD_PROJECT || !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
                throw new Error('Connection argument is empty')
            }
        }

        // The Google Cloud library will validate the connection object
        this._client = new Storage(connection)
    }

    /**
     * Create a container ("bucket") on the server.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the region
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    createContainer(container: string, options?: GoogleCloudCreateContainerOptions): Promise<void> {
        // Get storage options
        if (!options) {
            options = {}
        }
        const metadata = {} as CreateBucketRequest

        // Set storage class and default location
        switch (options.class) {
            case 'multi_regional':
                metadata.multiRegional = true
                metadata.location = 'us'
                break
            case 'regional':
                metadata.regional = true
                metadata.location = 'us-central1'
                break
            case 'coldline':
                metadata.coldline = true
                metadata.location = 'us-central1'
                break
            case 'nearline':
                metadata.nearline = true
                metadata.location = 'us-central1'
                break
        }

        // Check if we have a location/region
        if (options.region) {
            metadata.location = options.region
        }

        // Create the bucket, returning a promise
        const bucket = this._client.bucket(container)
        return bucket.create(metadata).then(() => {
            return
        })
    }

    /**
     * Check if a container exists.
     * 
     * @param container - Name of the container
     * @returns Promises that resolves with a boolean indicating if the container exists.
     * @async
     */
    isContainer(container: string): Promise<boolean> {
        const bucket = this._client.bucket(container)

        return bucket.exists().then((response) => {
            return !!response[0]
        })
    }

    /**
     * Create a container ("bucket") on the server if it doesn't already exist.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the region
     * @returns Promise that resolves once the container has been created
     * @async
     */
    ensureContainer(container: string, options?: GoogleCloudCreateContainerOptions): Promise<void> {
        return this.isContainer(container).then((exists) => {
            if (!exists) {
                return this.createContainer(container, options)
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
        return this._client.getBuckets().then((list) => {
            if (!list || !list[0] || !list[0].length) {
                return []
            }
            else {
                return list[0].map((el) => (el && el.name))
            }
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
        const bucket = this._client.bucket(container)
        return bucket.delete().then(() => {
            return
        })
    }

    /**
     * Uploads a stream to the object storage server
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param data - Object data or stream. Can be a Stream (Readable Stream), Buffer or string.
     * @param options - Key-value pair of options used by providers, including the `metadata` dictionary
     * @returns Promise that resolves once the object has been uploaded
     * @async
     */
    putObject(container: string, path: string, data: Stream|string|Buffer, options?: PutObjectOptions): Promise<void> {
        if (!options) {
            options = {}
        }

        const bucket = this._client.bucket(container)
        const file = bucket.file(path)

        // Convert strings and buffers to streams
        let dataStream: Stream
        if (IsStream(data)) {
            dataStream = data as Stream
        }
        else {
            dataStream = new Duplex()
            // Buffers
            if (typeof data == 'object' && Buffer.isBuffer(data)) {
                (dataStream as Duplex).push(data)
            }
            else if (typeof data == 'string') {
                (dataStream as Duplex).push(data, 'utf8')
            }
            else {
                throw Error('Invalid data argument: must be a stream, a Buffer or a string')
            }
            (dataStream as Duplex).push(null)
        }

        return new Promise((resolve, reject) => {
            // Clone the metadata object before modifying it
            const metadataClone = Object.assign({}, options.metadata) as {[k: string]: string}

            const streamOptions = {
                metadata: metadataClone,
                resumable: false,
                validation: 'md5'
            } as CreateWriteStreamOptions

            // Check if we have a Content-Type (case-insensitive)
            for (const key in metadataClone) {
                if (!metadataClone.hasOwnProperty(key)) {
                    continue
                }

                if (key.toLowerCase() == 'content-type') {
                    streamOptions.contentType = metadataClone[key]
                    delete metadataClone[key]
                    break
                }
            }

            dataStream.pipe(file.createWriteStream(streamOptions))
                .on('error', (err) => {
                    reject(err)
                })
                .on('finish', () => {
                    resolve()
                })
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
        const bucket = this._client.bucket(container)
        const file = bucket.file(path)

        // For Google Cloud Storage, this method doesn't actually need to be asynchronous
        return Promise.resolve(file.createReadStream({validation: 'md5'}))
    }

    /**
     * Returns a list of objects with a given prefix (folder). The list is not recursive, so prefixes (folders) are returned as such.
     * 
     * @param container - Name of the container
     * @param  prefix - Prefix (folder) inside which to list objects
     * @returns List of elements returned by the server
     * @async
     */
    listObjects(container: string, prefix?: string): Promise<ListResults> {
        let list = [] as ListResults
        const requestPromise = (opts: GetFilesOptions): Promise<ListResults> => {
            return new Promise((resolve, reject) => {
                if (!opts) {
                    opts = {
                        autoPaginate: false,
                        delimiter: '/',
                        // maxResults: 2, // For debug only
                        prefix: prefix
                    }
                }

                // Using the callback API so we can get the full list
                // Error in typings below
                this._client.bucket(container).getFiles(opts, (err, files, nextQuery, apiResponse) => {
                    if (err) {
                        return reject(err)
                    }

                    if (files && files.length) {
                        list = list.concat(files.map((el) => {
                            const obj = {
                                path: el.name
                            } as ListItemObject
                            if (el.metadata) {
                                if (el.metadata.size) {
                                    obj.size = parseInt(el.metadata.size, 10)
                                }
                                if (el.metadata.updated) {
                                    obj.lastModified = new Date(el.metadata.updated)
                                }
                                if (el.metadata.timeCreated) {
                                    obj.creationTime = new Date(el.metadata.timeCreated)
                                }
                                if (el.metadata.md5Hash) {
                                    // Google Cloud Storage returns the MD5 as base64, so convert it to HEX
                                    obj.contentMD5 = Buffer.from(el.metadata.md5Hash, 'base64').toString('hex')
                                }
                                if (el.metadata.contentType) {
                                    obj.contentType = el.metadata.contentType
                                }
                            }
                            return obj
                        }))
                    }

                    // Need to use any because of error with types
                    if (apiResponse && (apiResponse as any).prefixes) {
                        list = list.concat((apiResponse as any).prefixes.map((el) => {
                            return {prefix: el} as ListItemPrefix
                        }))
                    }

                    if (nextQuery) {
                        return resolve(requestPromise(nextQuery))
                    }
                    else {
                        return resolve(list)
                    }
                })
            })
        }

        return requestPromise(null)
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
        const bucket = this._client.bucket(container)
        const file = bucket.file(path)

        // Returns a promise
        return file.delete().then(() => {
            return
        })
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use to request an object from the server with a GET request, even if the object is private.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedGetUrl(container: string, path: string, ttl?: number): Promise<string> {
        return this.presignedUrl('read', container, path, ttl)
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param options - Key-value pair of options used by providers, including the `metadata` dictionary
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedPutUrl(container: string, path: string, options?: PutObjectOptions, ttl?: number): Promise<string> {
        const contentSettings = {} as any
        if (options && options.metadata) {
            // Check if we have a Content-Type (case-insensitive)
            for (const key in options.metadata) {
                if (!options.metadata.hasOwnProperty(key)) {
                    continue
                }

                if (key.toLowerCase() == 'content-type') {
                    contentSettings.contentType = options.metadata[key]
                    break
                }
            }
        }
        return this.presignedUrl('write', container, path, contentSettings, ttl)
    }

    /**
     * Returns a presigned URL for the specific operation.
     * 
     * @param operation - Action: "read" or "write"
     * @param container - Name of the container
     * @param path - Path of the target object, inside the container
     * @param contentSettings - Additional headers that are required
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for the specified operation
     * @async
     */
    private presignedUrl(action: 'read'|'write', container: string, path: string, contentSettings?: any, ttl?: number): Promise<string> {
        if (!ttl || ttl < 1) {
            ttl = 86400
        }

        const bucket = this._client.bucket(container)
        const file = bucket.file(path)

        // Returns a promise
        const config = Object.assign(
            {},
            {
                action: action,
                expires: new Date(Date.now() + ttl * 1000) // Convert TTL to a point in time
            },
            contentSettings || {}
        )

        return file.getSignedUrl(config).then((data: string[]) => {
            if (data && data[0]) {
                return data[0]
            }
            else {
                throw Error('No pre-signed URL was returned')
            }
        })
    }
}

export = GoogleCloudStorageProvider
