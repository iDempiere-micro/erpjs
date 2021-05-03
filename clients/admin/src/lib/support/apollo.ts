import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createMockClient } from 'mock-apollo-client';
import { mocks } from './mocks';
import { setClient as apolloSetClient } from '../../absorb/svelte-apollo';

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
        handler: () => {
            (window as any).token = null;
            window.location.replace('/');
        },
    },
];

const logoutLink = () =>
    onError(({ response }) => {
        errorHandlers.forEach(({ error, handler }) => {
            if (
                response?.errors &&
                response.errors.length > 0 &&
                response.errors[0].message.indexOf(error) >= 0
            ) {
                handler();
            }
        });
    });

export const apollo = (forceMock = false) => {
    if (process.env.MOCK || forceMock) {
        const mockClient = createMockClient();
        mocks.forEach(({ query, handler }) => mockClient.setRequestHandler(query, handler));
        return mockClient;
    }

    const token = process.env.FAKE_TOKEN || (window as any).token;
    const uri = process.env.API_BASE_URL;
    if (!uri) throw new Error('API_BASE_URL must be specified');
    const link = authLink(token!).concat(logoutLink().concat(httpLink(uri!)));
    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
};

export function setClient<TCache = any>(client: ApolloClient<TCache>): void {
    if (!process.env.FAKE_TOKEN) {
        apolloSetClient(client);
    }
}
