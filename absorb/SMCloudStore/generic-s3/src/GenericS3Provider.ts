'use strict'

import {ListItemObject, ListItemPrefix, ListResults, PutObjectOptions, StorageProvider} from '@smcloudstore/core/dist/StorageProvider'
import {Client as MinioClient, ClientOptions as MinioClientOptions} from 'minio'
import {Stream} from 'stream'

/**
 * Client to interact with a generic S3 object storage server, using the Minio library.
 */
class GenericS3Provider extends StorageProvider {
    protected _client: MinioClient

    /**
     * Initializes a new client to interact with Minio.
     * 
     * @param connection - Dictionary with connection options.
     */
    constructor(connection: MinioClientOptions) {
        if (!connection || !Object.keys(connection).length) {
            throw new Error('Connection argument is empty')
        }

        super(connection)

        // Provider name
        this._provider = 'generic-s3'

        // The Minio library will validate the connection object
        this._client = new MinioClient(connection)
    }

    /**
     * Create a container ("bucket") on the server.
     * 
     * @param container - Name of the container
     * @param options - The option argument is ignored by this provider.
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    createContainer(container: string, options?: any): Promise<void> {
        const region = ((this._client as any).region) || ''

        // This returns a promise
        return this._client.makeBucket(container, region)
    }

    /**
     * Check if a container exists.
     * 
     * @param container - Name of the container
     * @returns Promises that resolves with a boolean indicating if the container exists.
     * @async
     */
    isContainer(container: string): Promise<boolean> {
        return this._client.bucketExists(container)
            .then((result) => {
                return !!result
            })
    }

    /**
     * Create a container ("bucket") on the server if it doesn't already exist.
     * 
     * @param container - Name of the container
     * @param options - The option argument is ignored by this provider.
     * @returns Promise that resolves once the container has been created
     * @async
     */
    ensureContainer(container: string, options?: any): Promise<void> {
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
        return this._client.listBuckets()
            .then((list) => list.map((el) => (el && el.name) || undefined))
    }

    /**
     * Removes a container from the server
     * 
     * @param container - Name of the container
     * @returns Promise that resolves once the container has been removed
     * @async
     */
    deleteContainer(container: string): Promise<void> {
        return this._client.removeBucket(container)
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
        return Promise.resolve(this._client.putObject(container, path, data, null, (options && options.metadata)))
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
        return this._client.getObject(container, path)
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
        return new Promise((resolve, reject) => {
            const stream = this._client.listObjectsV2(container, prefix, false) as Stream
            const list = [] as ListResults
            stream.on('data', (obj) => {
                let res

                // If we have a file, add path, lastModified and size
                if (obj.name && obj.lastModified) {
                    res = {
                        lastModified: obj.lastModified,
                        path: obj.name,
                        size: obj.size
                    } as ListItemObject
                }
                // If we have a prefix (folder) instead
                else if (obj.prefix) {
                    res = {
                        prefix: obj.prefix
                    } as ListItemPrefix
                }
                else {
                    throw Error('Invalid object returned from the server')
                }

                list.push(res)
            })
            stream.on('error', (err) => {
                reject(err)
            })
            stream.on('end', () => {
                resolve(list)
            })
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
        return this._client.removeObject(container, path)
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
        if (!ttl || ttl < 1) {
            ttl = 86400
        }

        return this._client.presignedGetObject(container, path, ttl)
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param options - This argument is ignored by the GenericS3 provider
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedPutUrl(container: string, path: string, options?: any, ttl?: number): Promise<string> {
        if (!ttl || ttl < 1) {
            ttl = 86400
        }

        return this._client.presignedPutObject(container, path, ttl)
    }
}

export = GenericS3Provider
