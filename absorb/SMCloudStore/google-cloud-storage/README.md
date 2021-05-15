# @smcloudstore/google-cloud-storage

![](https://img.shields.io/npm/v/@smcloudstore/google-cloud-storage.svg?style=flat) ![](https://img.shields.io/github/license/ItalyPaleAle/SMCloudStore.svg?style=flat)

This package is a provider for [SMCloudStore](https://github.com/ItalyPaleAle/SMCloudStore), for Google Cloud Storage. SMCloudStore is a lightweight Node.js module that offers a simple API to interact with the object storage services of multiple cloud providers.

Please refer to the [main package](https://github.com/ItalyPaleAle/SMCloudStore) for the SMCloudStore documentation and instructions on how to use it.

## Provider-specific considerations

There are a few provider-specific considerations for the GoogleCloudStorage provider.

### Connection argument

When initializing the GoogleCloudStorage provider, the `connection` argument is an object with:

- `connection.projectId`: ID of the Google Cloud project
- `connection.keyFilename`: path of the JSON file containing the key

Example:

````js
// Require the package
const SMCloudStore = require('smcloudstore')

// Complete with the connection options for Google Cloud Storage
const connection = {
    projectId: 'name-100123',
    keyFilename: 'path/to/file.json'
}

// Return an instance of the GoogleCloudStorage class
const storage = SMCloudStore.create('google-cloud-storage', connection)
````

Alternatively, you might pass the same arguments via the `GCLOUD_PROJECT` and `GOOGLE_APPLICATION_CREDENTIALS` environmental variable. See the [official documentation](https://cloud.google.com/docs/authentication/getting-started) for more details.

### Creating a container

When using the [`storage.createContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/google_cloud_storage.googlecloudstorageprovider.html#createcontainer) and the [`storage.ensureContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/google_cloud_storage.googlecloudstorageprovider.html#ensurecontainer) methods, the `options` argument can be used to define some options for the container:

- `options.class` (optional): string determining the storage class to use. Please refer to the [documentation](https://cloud.google.com/storage/docs/storage-classes) for more informatiom.
  - `'multi_regional'` (default value)
  - `'regional'`
  - `'nearline'`
  - `'coldline'`
- `options.region` (optional): string determining the region in which to create the container; you can see a list in the [official documentation](https://cloud.google.com/storage/docs/bucket-locations). Default value is `us` if storage class is `multi_regional`; `us-central1` otherwise.

### Using pre-signed URLs

In the method [`storage.presignedPutUrl(container, path, [options], [ttl])`](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#presignedputurl), the Google Storage provider accepts the following keys for the `options` argument:

- `options.metadata['Content-Type']`: When set, clients uploading objects will have to specify the same "Content-Type" header in the request.

All other values in the `options` dictionary are ignored.

### Accessing the Google Cloud Storage SDK

The Google Cloud Storage provider is built on top of the official [Google Cloud Storage Node.js client](https://github.com/googleapis/nodejs-storage), which is exposed by calling [`storage.client()`](https://italypaleale.github.io/SMCloudStore/classes/google_cloud_storage.googlecloudstorageprovider.html#client).

You can use the object returned by this method to perform low-level operations using the Google Cloud Storage SDK.
