import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { setClient as apolloSetClient } from '../../absorb/svelte-apollo';
import type { ApolloConfig } from './types';

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
export const apollo = (config?: ApolloConfig) => {
    const token = (window as any).token || (config || { token: undefined }).token;
    const uri = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL;
    if (!uri) throw new Error('API_BASE_URL must be specified');
    if (!token) throw new Error('token must be provided');
    const link = authLink(token!).concat(logoutLink().concat(httpLink(uri!)));
    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });
};

export function setClient<TCache = any>(client: ApolloClient<TCache>): void {
    apolloSetClient(client);
}
