import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { authStore } from './auth';
import { setClient as apolloSetClient } from 'svelte-apollo';
import { createMockClient } from 'mock-apollo-client';
import { CUSTOMERS, mock } from './queries/customers';
import { mocks } from './mocks';

const httpLink = (uri: string) =>
    createHttpLink({
        uri,
    });

const authLink = (token: string) =>
    setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
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

export const apollo = (nextUrlIfLogout: string) => {
    if (process.env.MOCK) {
        const mockClient = createMockClient();
        mocks.forEach(({ query, handler }) => mockClient.setRequestHandler(query, handler));
        return mockClient;
    }

    const token = process.env.FAKE_TOKEN || authStore?.get()?.token;
    const uri = process.env.API_BASE_URL;
    if (!uri) throw new Error('API_BASE_URL must be specified');
    const redirect = nextUrlIfLogout.replace(':id', '');
    return new ApolloClient({
        link: authLink(token!).concat(logoutLink(nextUrlIfLogout).concat(httpLink(uri!))),
        cache: new InMemoryCache(),
    });
};

export function setClient<TCache = any>(client: ApolloClient<TCache>): void {
    if (!process.env.FAKE_TOKEN) {
        apolloSetClient(client);
    }
}
