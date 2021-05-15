# @smcloudstore/backblaze-b2

![](https://img.shields.io/npm/v/@smcloudstore/backblaze-b2.svg?style=flat) ![](https://img.shields.io/github/license/ItalyPaleAle/SMCloudStore.svg?style=flat)

This package is a provider for [SMCloudStore](https://github.com/ItalyPaleAle/SMCloudStore), for Backblaze B2. SMCloudStore is a lightweight Node.js module that offers a simple API to interact with the object storage services of multiple cloud providers.

Please refer to the [main package](https://github.com/ItalyPaleAle/SMCloudStore) for the SMCloudStore documentation and instructions on how to use it.

## System requirements

The Backblaze B2 provider requires **Node.js version 10 or higher**.

## Provider-specific considerations

There are a few provider-specific considerations for the BackblazeB2 provider.

### Connection argument

When initializing the BackblazeB2 provider, the `connection` argument is an object with:

- `connection.accountId`: string containing the account ID (the "public key")
- `connection.applicationKey`: string containing the application key (the "secret key"). Since this provides uses version 2 of the Backblaze B2 APIs, the key could be either the "master application key" or a "normal application key"; for more information, please refer to the [B2 documentation](https://www.backblaze.com/b2/docs/application_keys.html).

Example:

````js
// Require the package
const SMCloudStore = require('smcloudstore')

// Complete with the connection options for Backblaze B2
const connection = {
    accountId: 'ACCOUNT_ID_HERE',
    applicationKey: 'APPLICATION_KEY_HERE'
}

// Return an instance of the BackblazeB2Provider class
const storage = SMCloudStore.create('backblaze-b2', connection)
````

### Creating a container

When using the [`storage.createContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/backblaze_b2.backblazeb2provider.html#createcontainer) and the [`storage.ensureContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/backblaze_b2.backblazeb2provider.html#ensurecontainer) methods, the `options` argument can be used to define some options for the container:

- `options.access` (optional): string determining the permission for all objects inside the container; possible values are:
  - `'public'`
  - `'private'`

### Uploading an object

The Backblaze B2 APIs have relatively poor support for streams, as it requires the size of the data to be sent at the beginning of the upload request. Because of that, the Backblaze B2 provider can operate in two separate modes when uploading files:

1. If the length of the data can be known before the upload starts, the provider makes a single upload call. This applies to all situations when `data` is a Buffer or a string, and when `data` is a Stream and either the `options.length` argument is specified (see below), or `data.byteLength` is defined (all data is loaded in memory before being sent to the server in this case).
2. In the situation when `data` is a Stream and the length can't be known beforehand, if the data is longer than [`B2Upload.chunkSize`](https://italypaleale.github.io/SMCloudStore/classes/backblaze_b2.b2upload.html#chunksize) (default: 9MB; minimum: 5MB) the method will use B2's [large files APIs](https://www.backblaze.com/b2/docs/large_files.html). With those, it's possible to chunk the file into many chunks and upload them separately, thus it's not necessary to load the entire Stream in memory. However, this way of uploading files requires many more network calls, and could be significantly slower. B2 supports up to 1,000 chunks per object, so using 9MB chunks (the default value for `B2Upload.chunkSize`), maximum file size is 90GB.

> Note: There is currently an [issue](https://github.com/yakovkhalinsky/backblaze-b2/issues/45) with an upstream package that limits `B2Upload.chunkSize` to be no more than 10MB.

With the Backblaze B2 provider, the [`storage.putObject(container, path, data, [options])`](https://italypaleale.github.io/SMCloudStore/classes/backblaze_b2.backblazeb2provider.html#putobject) method comes with an extra key for the `options` dictionary, in addition to the standard `options.metadata` key:

- `options.length` (optional): as described above, when `data` is a Stream, if the length of the stream can be known in advance, setting `options.length` with the byte size (or the `byteLength` property in the `data` object directly) allows the BackblazeB2 provider to upload the object with a single call. This option is ignored if `data` is a string or Buffer.

### Using pre-signed URLs

Backblaze B2 does not support pre-signed URLs, which are not available in their APIs. Because of that, the methods `presignedGetUrl` and `presignedPutUrl` always throw an exception when called on the BackblazeB2 provider.

### Accessing the Backblaze B2 library

The AWS S3 provider is built on top of [backblaze-b2](https://github.com/yakovkhalinsky/backblaze-b2), which is exposed by calling [`storage.client()`](https://italypaleale.github.io/SMCloudStore/classes/backblaze_b2.backblazeb2provider.html#client).

You can use the object returned by this method to perform low-level operations using the backblaze-b2 module.
