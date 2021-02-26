import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

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

const logoutLink = (nextUrl: string) =>
    onError(({ response }) => {
        if (
            response?.errors &&
            response.errors.length > 0 &&
            response.errors[0].message.indexOf('Request failed with status code 401') >= 0
        ) {
            window.location.replace('/#nextUrl=' + nextUrl);
        }
    });

export const apollo = (token: string | undefined, uri: string | undefined, whereDoYouGo: string) =>
    new ApolloClient({
        link: authLink(token!).concat(logoutLink(whereDoYouGo).concat(httpLink(uri!))),
        cache: new InMemoryCache(),
    });
