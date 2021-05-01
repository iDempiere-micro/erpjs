import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authStore } from './auth';
import { createMockClient } from 'mock-apollo-client';
import { mocks } from './mocks';
import { getClient, setClient as apolloSetClient } from '../../absorb/svelte-apollo';

const httpLink = (uri: string) =>
    createHttpLink({
        uri,
    });

const authLink = (token: string) =>
    setContext((_, { headers }) => {

        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

const errorHandlers = [
    {
        error: 'Request failed with status code 401',
        handler: (nextUrl: string) => {
            authStore.set(null);
            window.location.replace('/#nextUrl=' + nextUrl);
        },
    },
];

const logoutLink = (nextUrl: string) =>
    onError(({ response }) => {
        errorHandlers.forEach(({ error, handler }) => {
            if (
                response?.errors &&
                response.errors.length > 0 &&
                response.errors[0].message.indexOf(error) >= 0
            ) {
                handler(nextUrl);
            }
        });
    });

export const apollo = (nextUrlIfLogout: string, forceMock = false) => {
    if (process.env.MOCK || forceMock) {
        const mockClient = createMockClient();
        mocks.forEach(({ query, handler }) => mockClient.setRequestHandler(query, handler));
        return mockClient;
    }

    let client;
    try {
        client = getClient();
    } catch (e) {
        // nothing to do, will create a new instance, client is not set probably
    }
    const token = process.env.FAKE_TOKEN || authStore?.get()?.token;
    console.log('*** apollo token', token, client);
    const uri = process.env.API_BASE_URL;
    if (!uri) throw new Error('API_BASE_URL must be specified');
    const redirect = nextUrlIfLogout.replace(':id', '');
    const link = authLink(token!).concat(logoutLink(redirect).concat(httpLink(uri!)));
    if (client) {
        client.link = link;
        return client;
    } else {
        return new ApolloClient({
            link,
            cache: new InMemoryCache(),
        });
    }
};

export function setClient<TCache = any>(client: ApolloClient<TCache>): void {
    if (!process.env.FAKE_TOKEN) {
        apolloSetClient(client);
    }
}
