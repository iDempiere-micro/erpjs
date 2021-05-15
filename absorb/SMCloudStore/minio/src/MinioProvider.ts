'use strict'

import GenericS3Provider = require('@smcloudstore/generic-s3')
import {ClientOptions as MinioClientOptions} from 'minio'

/**
 * Client to interact with Minio. It is based on the GenericS3 Provider class.
 */
class MinioProvider extends GenericS3Provider {
    /**
     * Initializes a new client to interact with Minio.
     * 
     * @param connection - Dictionary with connection options.
     */
    constructor(connection: MinioClientOptions) {
        if (!connection || !Object.keys(connection).length) {
            throw new Error('Connection argument is empty')
        }

        // Initialize the GenericS3 provider, on which this is based
        super(connection)

        this._provider = 'minio'
    }
}

export = MinioProvider
