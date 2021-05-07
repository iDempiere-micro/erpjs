'use strict'

import {Stream} from 'stream'
import {StreamToBuffer, StreamToString} from './StreamUtils'

/** Dictionary of objects returned when listing a container. */
export interface ListItemObject {
    /** Full path of the object inside the container */
    path: string
    /** Size in bytes of the object */
    size: number
    /** Date when the object was last modified */
    lastModified: Date
    /** Date when the object was created */
    creationTime?: Date
    /** Content-Type header of the object, if present */
    contentType?: string
    /** MD5 digest of the object, if present */
    contentMD5?: string
    /** SHA1 digest of the objet, if present */
    contentSHA1?: string
}

/** Dictionary of options used when putting an object. Many providers will extend this. */
export interface PutObjectOptions {
    /** Key-value pair with metadata for the object, for example `Content-Type`, or custom tags */
    metadata?: any
}

/** Dictionary of prefixes returned when listing a container. */
export interface ListItemPrefix {
    /** Name of the prefix */
    prefix: string
}

/** The `listObjects` method returns an array with a mix of objects of type `ListItemObject` and `ListItemPrefix` */
export type ListResults = Array<ListItemObject|ListItemPrefix>

/**
 * Base class for all storage providers.
 */
export abstract class StorageProvider {
    protected _client: any
    protected _provider: string

    /**
     * Initializes a new storage provider
     * 
     * @param connection - Connection options
     */
    constructor(connection: any) {
        this._client = null
        this._provider = null
    }

    /**
     * Returns the name of the provider
     * @returns Provider name
     */
    get provider(): string {
        return this._provider
    }

    /**
     * Returns an instance of the client object, to interact with the cloud provider directly
     * @returns Client object
     */
    get client(): any {
        return this._client
    }

    /**
     * Creates a container on the server.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container; some providers might require some options.
     * @returns Promise that resolves once the container has been created. The promise doesn't contain any meaningful return value.
     * @async
     */
    abstract createContainer(container: string, options?: any): Promise<void>

    /**
     * Checks if a container exists.
     * 
     * @param container - Name of the container
     * @returns Promises that resolves with a boolean indicating if the container exists.
     * @async
     */
    abstract isContainer(container: string): Promise<boolean>

    /**
     * Creates a container on the server if it doesn't already exist.
     * 
     * @param container - Name of the container
     * @param options - Dictionary with options for creating the container; some providers might require some options.
     * @returns Promise that resolves once the container has been created
     * @async
     */
    abstract ensureContainer(container: string, options?: any): Promise<void>

    /**
     * Lists all containers belonging to the user
     * 
     * @returns Promise that resolves with an array of all the containers
     * @async
     */
    abstract listContainers(): Promise<string[]>

    /**
     * Removes a container from the server
     * 
     * @param container - Name of the container
     * @returns Promise that resolves once the container has been removed
     * @async
     */
    abstract deleteContainer(container: string): Promise<void>

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
    abstract putObject(container: string, path: string, data: Stream|string|Buffer, options?: PutObjectOptions): Promise<void>

    /**
     * Requests an object from the server. The method returns a Promise that resolves to a Readable Stream containing the data.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @returns Readable Stream containing the object's data
     * @async
     */
    abstract getObject(container: string, path: string): Promise<Stream>

    /**
     * Requests an object from the server. The method returns a Promise that resolves to a Buffer object containing the data from the server.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @returns Buffer containing the object's data
     * @async
     */
    getObjectAsBuffer(container: string, path: string): Promise<Buffer> {
        // Get the data as stream
        return this.getObject(container, path)
            // Read the stream into a Buffer
            .then((stream) => StreamToBuffer(stream))
    }

    /**
     * Requests an object from the server. The method returns a Promise that resolves to a string containing the data from the server.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @param encoding - Optional encoding for the string; defaults to utf8
     * @returns String containing the object's data
     * @async
     */
    getObjectAsString(container: string, path: string, encoding?: string): Promise<string> {
        // Get the data as stream
        return this.getObject(container, path)
            // Read the stream into a string
            .then((stream) => StreamToString(stream, encoding))
    }

    /**
     * Returns a list of objects with a given prefix (folder). The list is not recursive, so prefixes (folders) are returned as such.
     * 
     * @param container - Name of the container
     * @param prefix - Prefix (folder) inside which to list objects
     * @returns List of elements returned by the server
     * @async
     */
    abstract listObjects(container: string, prefix?: string): Promise<ListResults>

    /**
     * Removes an object from the server
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @returns Promise that resolves once the object has been removed
     * @async
     */
    abstract deleteObject(container: string, path: string): Promise<void>

    /**
     * Returns a URL that clients (e.g. browsers) can use to request an object from the server with a GET request, even if the object is private.
     * 
     * @param container - Name of the container
     * @param path - Path of the object, inside the container
     * @param ttl - Expiry time of the URL, in seconds (default: 1 day)
     * @returns Promise that resolves with the pre-signed URL for GET requests
     * @async
     */
    abstract presignedGetUrl(container: string, path: string, ttl?: number): Promise<string>

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
    abstract presignedPutUrl(container: string, path: string, options?: PutObjectOptions, ttl?: number): Promise<string>
}
