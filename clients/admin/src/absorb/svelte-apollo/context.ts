import type { ApolloClient } from '@apollo/client';

export function getClient<TCache = any>(): ApolloClient<TCache> {
    const client = (window as any).___APOLLO_CLIENT___;

    if (!client) {
        throw new Error(
            'ApolloClient has not been set yet, use setClient(new ApolloClient({ ... })) to define it',
        );
    }

    return client as ApolloClient<TCache>;
}

export function setClient<TCache = any>(client: ApolloClient<TCache>): void {
    (window as any).___APOLLO_CLIENT___ = client;
}
