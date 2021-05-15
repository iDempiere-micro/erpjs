# @smcloudstore/generic-s3

![](https://img.shields.io/npm/v/@smcloudstore/generic-s3.svg?style=flat) ![](https://img.shields.io/github/license/ItalyPaleAle/SMCloudStore.svg?style=flat)

This package is a provider for [SMCloudStore](https://github.com/ItalyPaleAle/SMCloudStore), for a generic S3-compatible provider, including AWS S3. SMCloudStore is a lightweight Node.js module that offers a simple API to interact with the object storage services of multiple cloud providers.

Please refer to the [main package](https://github.com/ItalyPaleAle/SMCloudStore) for the SMCloudStore documentation and instructions on how to use it.

## Provider-specific considerations

There are a few provider-specific considerations for the GenericS3 provider.

### Connection argument

When initializing the GenericS3 provider, the `connection` argument is an object with:

- `connection.endPoint`: string representing the endpoint of the server to connect to; for AWS S3, set this to `s3.amazonaws.com` and the library will pick the correct endpoint based on the `connection.region` argument (default: 'us-east-1')
- `connection.accessKey`: string containing the access key (the "public key")
- `connection.secretKey`: string containing the secret key
- `connection.useSSL` (optional): boolean that will force the connection using HTTPS if true (default: true)
- `connection.port` (optional): number representing the port to connect to; defaults to 443 if `useSSL` is true, 80 otherwise
- `connection.region` (optional): string containing the AWS region to use, useful for connecting to AWS S3

Example:

````js
// Require the package
const SMCloudStore = require('smcloudstore')

// Complete with the connection options for GenericS3
const connection = {
    endPoint: 'storage.cloudprovider.com',
    accessKey: 'PUBLIC_KEY_HERE',
    secretKey: 'SECRET_KEY_HERE',
}

// Return an instance of the GenericS3Provider class
const storage = SMCloudStore.create('generic-s3', connection)
````

### Using pre-signed URLs

In the method [`storage.presignedPutUrl(container, path, [options], [ttl])`](https://italypaleale.github.io/SMCloudStore/classes/generic_s3.generics3provider.html#presignedputurl), the Generic S3 provider ignores the `options` argument, which has no effect on the generated tokens.

### Accessing the Minio library

The Generic S3 provider is built on top of the [Minio JavaScript client](https://github.com/minio/minio-js), which is exposed by calling [`storage.client()`](https://italypaleale.github.io/SMCloudStore/classes/generic_s3.generics3provider.html#client).

You can use the object returned by this method to perform low-level operations using the Minio client.
