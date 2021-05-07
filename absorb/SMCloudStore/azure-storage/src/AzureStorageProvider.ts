'use strict'

import {ListItemObject, ListItemPrefix, ListResults, PutObjectOptions, StorageProvider} from '@smcloudstore/core/dist/StorageProvider'
import * as Azure from 'azure-storage'
import {Stream, Transform} from 'stream'

/**
 * Connection options for an Azure Blob Storage provider.
 */
interface AzureStorageConnectionObject {
    /** Name of the storage account */
    storageAccount: string
    /** Access key (secret key) for the storage account */
    storageAccessKey: string
    /** Endpoint to use. Default is `core.windows.net` */
    host?: string
}
type AzureStorageConnectionOptions = string | AzureStorageConnectionObject

/**
 * Options passed when creating a container
 */
interface AzureStorageCreateContainerOptions {
    /** 
     * Determine access level for all files in the container. Defaults to 'none' if not specified.
     * 'public' and 'private' are not standard in the Azure APIs, and are aliased to 'container' and 'none' respectively.
     */
    access?: 'blob' | 'container' | 'none' | 'public' | 'private'
}

/**
 * Returns the request options dictionary for the `putObject` method
 * 
 * @param options - Dictionary with options
 * @returns Dictionary with options to send to Azure
 */
function PutObjectRequestOptions(options: PutObjectOptions): Azure.BlobService.CreateBlockBlobRequestOptions {
    // Azure wants some headers, like Content-Type, outside of the metadata object
    const requestOptions = {
        contentSettings: {},
        metadata: {}
    } as Azure.BlobService.CreateBlockBlobRequestOptions

    // If no other options...
    if (!options) {
        return requestOptions
    }

    // Metadata
    if (options.metadata) {
        requestOptions.metadata = {}

        for (const key in options.metadata) {
            if (!options.metadata.hasOwnProperty(key)) {
                continue
            }

            const keyLowerCase = key.toLowerCase()
            switch (keyLowerCase) {
                case 'cache-control':
                    requestOptions.contentSettings.cacheControl = options.metadata[key]
                    break
                case 'content-disposition':
                    requestOptions.contentSettings.contentDisposition = options.metadata[key]
                    break
                case 'content-encoding':
                    requestOptions.contentSettings.contentEncoding = options.metadata[key]
                    break
                case 'content-language':
                    requestOptions.contentSettings.contentLanguage = options.metadata[key]
                    break
                case 'content-md5':
                    requestOptions.contentSettings.contentMD5 = options.metadata[key]
                    break
                case 'content-type':
                    requestOptions.contentSettings.contentType = options.metadata[key]
                    break
                default:
                    requestOptions.metadata[key] = options.metadata[key]
                    break
            }
        }
    }

    return requestOptions
}

/**
 * Client to interact with Azure Blob Storage.
 */
class AzureStorageProvider extends StorageProvider {
    protected _client: Azure.BlobService

    /**
     * Initializes a new client to interact with Azure Blob Storage.
     * 
     * @param connection - Connection options, passed as an object with interface `AzureStorageConnectionObject`, or as a connection string (e.g. as returned from the Azure Portal)
     */
    constructor(connection: AzureStorageConnectionOptions) {
        super(connection)

        // Provider name
        this._provider = 'azure-storage'

        // The Azure library will validate the connection object
        if (typeof connection == 'string') {
            this._client = Azure.createBlobService(connection as string)
        }
        else {
            this._client = Azure.createBlobService(connection.storageAccount, connection.storageAccessKey, connection.host || undefined)
        }
    }

    /**
     * Create a container on the server.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the access level (defaults to 'none' if not specified)
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    createContainer(container: string, options?: AzureStorageCreateContainerOptions): Promise<void> {
        return this._createContainerInternal(container, false, options).then(() => {
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
        return new Promise((resolve, reject) => {
            this._client.getContainerProperties(container, (err, response) => {
                if (err) {
                    // If error is "Not Found", then just return false
                    return err.toString().match(/NotFound/) ?
                        resolve(false) :
                        reject(err)
                }
                else if (response && response.name) {
                    return resolve(true)
                }
                else {
                    throw Error('Response does not contain storage account name')
                }
            })
        })
    }

    /**
     * Create a container on the server if it doesn't already exist.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container, including the access level (defaults to 'none' if not specified)
     * @returns Promise that resolves once the container has been created
     * @async
     */
    ensureContainer(container: string, options?: AzureStorageCreateContainerOptions): Promise<void> {
        return this._createContainerInternal(container, true, options).then(() => {
            return
        })
    }

    /**
     * Lists all containers belonging to the user
     * 
     * @returns Promise that resolves with an array of all the containers
     * @async
     */
    listContainers(): Promise<string[]> {
        const resultList = [] as string[]

        // The response might be split into multiple pages, so we need to be prepared to make multiple requests and use a continuation token
        const requestPromise = (continuationToken: Azure.common.ContinuationToken): Promise<string[]> => {
            return new Promise((resolve, reject) => {
                this._client.listContainersSegmented(continuationToken, (err, response) => {
                    if (err) {
                        return reject(err)
                    }

                    // Iterate through entries
                    if (!response.entries || !Array.isArray(response.entries)) {
                        throw Error('Response does not contain an entries array')
                    }
                    for (const i in response.entries) {
                        if (response.entries.hasOwnProperty(i)) {
                            const e = response.entries[i]
                            if (!e || !e.name) {
                                throw Error('Invalid entry')
                            }
                            resultList.push(e.name)
                        }
                    }

                    // Check if we have a continuation token
                    if (response.continuationToken) {
                        // We have a token, so need to make another request, returning a promise
                        resolve(requestPromise(response.continuationToken))
                    }
                    else {
                        // No token, so return the list of what we've collected
                        resolve(resultList)
                    }
                })
            })
        }

        return requestPromise(null)
    }

    /**
     * Removes a container from the server
     * 
     * @param container - Name of the container
     * @returns Promise that resolves once the container has been removed
     * @async
     */
    deleteContainer(container: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this._client.deleteContainer(container, (err, response) => {
                if (err) {
                    return reject(err)
                }
                else if (!response || !response.isSuccessful) {
                    throw Error('Response was empty or not successful')
                }
                else {
                    return resolve()
                }
            })
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
        if (!data) {
            throw Error('Argument data is empty')
        }

        const requestOptions = PutObjectRequestOptions(options)

        return new Promise((resolve, reject) => {
            const callback = (err, response) => {
                if (err) {
                    return reject(err)
                }
                // When uploading a string or Buffer, we have a complex object; for a stream, we just have a list of committedBlocks in the response
                if (!response || (!response.name && !response.commmittedBlocks)) {
                    throw Error('Response was empty or not successful')
                }
                else {
                    return resolve()
                }
            }

            // Check if we have a stream
            if (typeof data == 'object' && typeof (data as any).pipe == 'function') {
                (data as Stream).pipe(this._client.createWriteStreamToBlockBlob(container, path, requestOptions, callback))
            }
            // Strings and Buffers are supported too
            else if (typeof data == 'string' || (typeof data == 'object' && Buffer.isBuffer(data))) {
                this._client.createBlockBlobFromText(container, path, data, requestOptions, callback)
            }
            // Fail otherwise
            else {
                throw Error('Argument data must be a Stream, a String or a Buffer')
            }
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
        // Create a transform stream we can return in the result, which is readable
        const duplexStream = new Transform({
            transform: (chunk, encoding, done) => {
                done(null, chunk)
            }
        })
        // Request the data
        this._client.getBlobToStream(container, path, duplexStream, (err, response) => {
            // Pass errors to the stream as events
            if (err) {
                duplexStream.destroy((typeof err == 'object' && err instanceof Error) ? err : Error(err))
            }
        })

        // Wrap this in a promise because the method expects result to be async
        return Promise.resolve(duplexStream)
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
        const resultList = []

        // The response might be split into multiple pages, so we need to be prepared to make multiple requests and use a continuation token
        const requestPromise = (type: 'blob'|'prefix', continuationToken: Azure.common.ContinuationToken): Promise<ListResults> => {
            return new Promise((resolve, reject) => {
                // The following properties/methods aren't defined in the typings file
                const blobTypeConstants = (Azure.Constants.BlobConstants as any).ListBlobTypes
                const listBlobType = (type == 'prefix') ? blobTypeConstants.Directory : blobTypeConstants.Blob

                const clientAny = this._client as any
                clientAny._listBlobsOrDircotriesSegmentedWithPrefix(container, prefix || null, continuationToken, listBlobType, {delimiter: '/'}, (err, response) => {
                    if (err) {
                        return reject(err)
                    }

                    // Iterate through the list of items and add objects to the result list
                    for (const i in response.entries) {
                        if (response.entries.hasOwnProperty(i)) {
                            const e = response.entries[i]

                            // Is this a prefix (folder) or object? If etag is present, it's an object
                            if (e.etag) {
                                const res = {
                                    creationTime: e.creationTime ? new Date(e.creationTime) : undefined,
                                    lastModified: e.lastModified ? new Date(e.lastModified) : undefined,
                                    path: e.name,
                                    size: parseInt(e.contentLength, 10)
                                } as ListItemObject
                                /* istanbul ignore else */
                                if (e.contentSettings && e.contentSettings.contentMD5) {
                                    // Azure returns the Content-MD5 header as base64, so convert it to HEX
                                    res.contentMD5 = Buffer.from(e.contentSettings.contentMD5, 'base64').toString('hex')
                                }
                                /* istanbul ignore else */
                                if (e.contentSettings && e.contentSettings.contentType) {
                                    res.contentType = e.contentSettings.contentType
                                }
                                resultList.push(res)
                            }
                            else {
                                resultList.push({
                                    prefix: e.name
                                } as ListItemPrefix)
                            }
                        }
                    }

                    // Check if we have a continuation token
                    if (response.continuationToken) {
                        // We have a token, so need to make another request, returning a promise
                        resolve(requestPromise(type, response.continuationToken))
                    }
                    else {
                        // No token, so return the list of what we've collected
                        resolve(resultList)
                    }
                })
            })
        }

        return Promise.all([
            requestPromise('blob', null),
            requestPromise('prefix', null)
        ]).then(() => {
            return resultList
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
        return new Promise((resolve, reject) => {
            this._client.deleteBlob(container, path, (err, response) => {
                if (err) {
                    return reject(err)
                }
                else if (!response || !response.isSuccessful) {
                    throw Error('Response was empty or not successful')
                }
                else {
                    return resolve()
                }
            })
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
        return this.presignedUrl('getObject', container, path, ttl)
    }

    /**
     * Returns a URL that clients (e.g. browsers) can use for PUT operations on an object in the server, even if the object is private.
     * 
     * Notes on using presigned URLs to upload files to Azure Storage using PUT:
     * 
     * 1. The maximum file size is 100MB; larger files will trigger an error.
     * 2. You need to set the `X-MS-Blob-Type: BlockBlob` header for uploads to succeed
     * 
     * @param container - Name of the container
     * @param path - Path where to store the object, inside the container
     * @param options - Key-value pair of options used by providers, including the `metadata` dictionary
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    presignedPutUrl(container: string, path: string, options?: PutObjectOptions, ttl?: number): Promise<string> {
        const requestOptions = PutObjectRequestOptions(options)
        return this.presignedUrl('putObject', container, path, requestOptions.contentSettings, ttl)
    }

    /**
     * Returns a presigned URL for the specific operation.
     * 
     * @param operation - Operation: "getObject" or "putObject"
     * @param container - Name of the container
     * @param path - Path of the target object, inside the container
     * @param contentSettings - Additional headers that are required
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for the specified operation
     * @async
     */
    private presignedUrl(operation: 'getObject'|'putObject', container: string, path: string, contentSettings?: any, ttl?: number): Promise<string> {
        if (!ttl || ttl < 1) {
            ttl = 86400
        }

        // Remove contentMD5 from contentSettings, as that can't be known
        if (contentSettings && contentSettings.contentMD5) {
            delete contentSettings.contentMD5
        }

        // Policy
        const policy = {
            AccessPolicy: {
                Expiry: new Date(Date.now() + ttl * 1000), // Convert TTL to a point in time
                Permissions: (operation == 'getObject') ? Azure.BlobUtilities.SharedAccessPermissions.READ : Azure.BlobUtilities.SharedAccessPermissions.WRITE
            }
        } as Azure.common.SharedAccessPolicy

        const signature = this._client.generateSharedAccessSignature(container, path, policy, contentSettings)

        const url = this._client.getUrl(container, path, signature)

        return Promise.resolve(url)
    }

    /**
     * Create a container on the server, choosing whether to use the "ifNotExists" method or not
     * @param container - Name of the container
     * @param ifNotExists - If true, use the "ifNotExists" method variant
     * @param options - Dictionary with options for creating the container, including the access level (defaults to 'none' if not specified)
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    private _createContainerInternal(container: string, ifNotExists: boolean, options?: AzureStorageCreateContainerOptions): Promise<void> {
        return new Promise((resolve, reject) => {
            const containerOpts = {
                // All containers are private by default
                publicAccessLevel: null
            } as Azure.BlobService.CreateContainerOptions
            // Check if the user wants a public container
            if (options && options.access) {
                if (options.access == 'blob') {
                    containerOpts.publicAccessLevel = 'blob'
                }
                else if (options.access == 'container' || options.access == 'public') {
                    containerOpts.publicAccessLevel = 'container'
                }
            }

            const callback = (err, response) => {
                if (err) {
                    return reject(err)
                }
                else if (response && response.name) {
                    return resolve()
                }
                else {
                    throw Error('Response does not contain storage account name')
                }
            }

            if (ifNotExists) {
                this._client.createContainerIfNotExists(container, containerOpts, callback)
            }
            else {
                this._client.createContainer(container, containerOpts, callback)
            }
        })
    }
}

export = AzureStorageProvider
