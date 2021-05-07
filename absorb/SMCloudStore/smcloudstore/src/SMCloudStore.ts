import { AwsS3Provider } from '../../aws-s3/src/AwsS3Provider';
import { StorageProvider } from '../../core/src/StorageProvider';

export const SMCloudStore = {
    /**
     * Initializes a new client to interact with cloud providers' object storage services.
     *
     * @param provider - Name of the cloud provider to use (see `SMCloudStore.Providers`)
     * @param connection - Dictionary with connection options. List of keys is specific for every cloud provider
     * @returns An instance of a cloud provider module
     */
    create: (provider: string, connection: any): StorageProvider => {
        // Validate arguments
        const supportedProviders = SMCloudStore.providers()
        if (!provider || typeof provider !== 'string' || supportedProviders.indexOf(provider) < 0) {
            throw Error('The specified provider is not valid. Valid providers include: ' + supportedProviders.join(', '))
        }

        if (!connection) {
            throw Error('The connection argument must be non-empty')
        }

        switch(provider) {
            case 'aws-s3': return new AwsS3Provider(connection);
        }

        throw new Error(`Provider '${provider}' not supported, check SMCloudStore.ts`);
    },

    /**
     * Returns a list of supported providers.
     *
     * @returns List of supported provider names
     */
    providers: (): string[] => {
        return [
            'aws-s3',
            /* 'azure-storage', not yet
            'backblaze-b2',
            'generic-s3',
            'google-cloud-storage',
            'minio' */
        ]
    }
}

