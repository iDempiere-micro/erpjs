import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { ApolloConfig } from './types';
import { createMockClient } from 'mock-apollo-client';
import { translateMocks } from './mocks';

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
            window.location.reload();
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

//
export const apollo = (config: ApolloConfig) => {
    const { token, url, mockDefs, forceMock } = config;

    if (forceMock) {
        const mockClient = createMockClient();
        translateMocks(mockDefs).forEach(({ query, handler }) =>
            mockClient.setRequestHandler(query, handler),
        );
        return mockClient;
    }

    if (!url) throw new Error('API_BASE_URL must be specified');
    if (!token) throw new Error('token must be provided');
    const link = authLink(token!).concat(logoutLink().concat(httpLink(url)));
    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
};
