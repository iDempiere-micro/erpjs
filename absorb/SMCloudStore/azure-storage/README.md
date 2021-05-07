# @smcloudstore/azure-storage

![](https://img.shields.io/npm/v/@smcloudstore/azure-storage.svg?style=flat) ![](https://img.shields.io/github/license/ItalyPaleAle/SMCloudStore.svg?style=flat)

This package is a provider for [SMCloudStore](https://github.com/ItalyPaleAle/SMCloudStore), for Azure Blob Storage. SMCloudStore is a lightweight Node.js module that offers a simple API to interact with the object storage services of multiple cloud providers.

Please refer to the [main package](https://github.com/ItalyPaleAle/SMCloudStore) for the SMCloudStore documentation and instructions on how to use it.

## Provider-specific considerations

There are a few provider-specific considerations for the AzureStorage provider.

### Connection argument

When initializing the AzureStorage provider, the `connection` argument can be one of the following:

- A string containing the full "connection string" for the storage account, for example as copied from the Azure Portal. This looks like `'DefaultEndpointsProtocol=https;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net'`.
- Alternatively, you can pass the connection options as a dictionary:
  - `connection.storageAccount`: string containing the Storage Account name
  - `connection.storageAccessKey`: string containing the Storage Account access key (the "secret key")
  - `connection.host` (optional): string containing the endpoint to use: this is useful if you're using Azure China (`core.chinacloudapi.cn`) or Azure Germany (`core.cloudapi.de`), or if you're using Azure Stack. Default value is `core.windows.net`, which is the default for public, global Azure regions.

Example:

````js
// Require the package
const SMCloudStore = require('smcloudstore')

// Complete with the connection options for Azure Blob Storage
const connection = {
    storageAccount: 'STORAGE_ACCOUNT_NAME',
    storageAccessKey: 'SECRET_KEY_HERE'
}

// Return an instance of the AzureStorageProvider class
const storage = SMCloudStore.create('azure-storage', connection)
````

### Creating a container

When using the [`storage.createContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#createcontainer) and the [`storage.ensureContainer(container, [options])`](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#ensurecontainer) methods, the `options` argument can be used to define some options for the container:

- `options.access` (optional): string determining the permission level for the container and its contents. Please refer to the [documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-manage-access-to-resources#grant-anonymous-users-permissions-to-containers-and-blobs) for more informatiom.
  - `'container'` (alias `'public'` for compatibility with other storage providers)
  - `'blob'`
  - `'none'` (alias `'private'` for compatibility with other storage providers)), this is the default value.

### Using pre-signed URLs

In the method [`storage.presignedPutUrl(container, path, [options], [ttl])`](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#presignedputurl), the Azure Storage provider accepts for the `options` argument the same dictionary as the ['`storage.putObject(container, path, data, [options])`'](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#putobject) method. If you specify a Content-Type in the request for the presigned URL, for example, clients will need to make PUT requests with the same Content-Type.

When uploading an object using a PUT request, Azure Storage requires clients to send an additional header with the request (case-insensitive):

````plain
X-MS-Blob-Type: BlockBlob
````

For example, with curl:

````sh
curl \
  --request PUT \
  --upload-file "/path/to/file" \
  --header 'X-MS-Blob-Type: BlockBlob' \
  "https://storageaccount.blob.storage.windows.net/path?token=..."
````

Lastly, please note that Azure Storage supports PUT upload operations with objects no larger than 100 MB. Trying to upload larger objects will fail.

### Accessing the Azure Storage SDK

The Azure Blob Storage provider is built on top of the official [Azure Storage SDK for Node.js](https://github.com/Azure/azure-storage-node), which is exposed by calling [`storage.client()`](https://italypaleale.github.io/SMCloudStore/classes/azure_storage.azurestorageprovider.html#client).

You can use the object returned by this method to perform low-level operations using the Azure Storage SDK.
