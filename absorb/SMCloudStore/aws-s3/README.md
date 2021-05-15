# @smcloudstore/aws-s3

![](https://img.shields.io/npm/v/@smcloudstore/aws-s3.svg?style=flat) ![](https://img.shields.io/github/license/ItalyPaleAle/SMCloudStore.svg?style=flat)

This package is a provider for [SMCloudStore](https://github.com/ItalyPaleAle/SMCloudStore), for AWS S3. SMCloudStore is a lightweight Node.js module that offers a simple API to interact with the object storage services of multiple cloud providers.

Please refer to the [main package](https://github.com/ItalyPaleAle/SMCloudStore) for the SMCloudStore documentation and instructions on how to use it.

## Provider-specific considerations

There are a few provider-specific considerations for the AwsS3 provider.

### Connection argument

When initializing the AwsS3 provider, the `connection` argument is an object with:

- `connection.accessKeyId`: string containing the access key ID (the "public key")
- `connection.secretAccessKey`: string containing the secret access key (the "secret key")
- `connection.region` (optional): string containing the AWS region to use. List of regions is available on the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region). Defaults to US Standard (Virginia) if not specified.

Example:

````js
// Require the package
const SMCloudStore = require('smcloudstore')

// Complete with the connection options for AWS S3
const connection = {
    accessKeyId: 'PUBLIC_KEY_HERE',
    secretAccessKey: 'SECRET_KEY_HERE',
    region: 'us-west-1'
}

// Return an instance of the AwsS3Provider class
const storage = SMCloudStore.create('aws-s3', connection)
````

### Creating a container

When using the [`storage.createContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#createcontainer) and the [`storage.ensureContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#ensurecontainer) methods, the `options` argument can be used to define some options for the container:

- `options.access` (optional): string determining the default ACL for the container. Accepted values are listed below, and please refer to the [documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl) for more details:
  - `'public-read'` (alias `'public'` for compatibility with other storage providers)
  - `'public-read-write'`
  - `'authenticated-read'`
  - `'private'` (alias `'none'` for compatibility with other storage providers)), this is the default value.

### Uploading an object

With the AWS S3 provider, the [`storage.putObject(container, path, data, [options])`](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#putobject) method comes with a few more keys for the `options` dictionary, in addition to the standard `options.metadata` key:

- `options.access` (optional): string determining the ACL for the object. Accepted values are listed below, and please refer to the [documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl) for more details:
  - `'public-read'` (alias `'public'` for compatibility with other storage providers)
  - `'public-read-write'`
  - `'authenticated-read'`
  - `'private'` (alias `'none'` for compatibility with other storage providers)), this is the default value.
- `options.serverSideEncryption` (optional): when true, enables AES256 encryption at rest with keys managed by AWS. Default value is false (disabled).
- `options.class` (optional): string represeting the storage class to use. Please see the documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/storage-class-intro.html) for details; possible values are:
  - `'STANDARD'`
  - `'REDUCED_REDUNDANCY'`
  - `'STANDARD_IA'`
  - `'ONEZONE_IA'`

### Using pre-signed URLs

In the method [`storage.presignedPutUrl(container, path, [options], [ttl])`](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#presignedputurl), the AWS S3 provider accepts for the `options` argument the same dictionary as the ['`storage.putObject(container, path, data, [options])`'](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#putobject) method. If you specify a Content-Type in the request for the presigned URL, for example, clients will need to make PUT requests with the same Content-Type.

### Accessing the AWS-SDK

The AWS S3 provider is built on top of the official [AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js), which is exposed by calling [`storage.client()`](https://italypaleale.github.io/SMCloudStore/classes/aws_s3.awss3provider.html#client).

You can use the object returned by this method to perform low-level operations using the AWS S3 SDK. Note that only the S3 library is loaded, and not the full AWS SDK for JavaScript.
