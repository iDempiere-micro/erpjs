import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

export const apollo = (token, uri = process.env.API_BASE_URL) =>
    new ApolloClient({
        link: new ApolloLink((operation, forward) => {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return forward(operation);
        }).concat(createHttpLink({ uri })),
        cache: new InMemoryCache(),
    });

export const gqlQuery = async (this_component, session, gql) => {
    const { token } = session;

    if (!token) {
        return this_component.redirect(302, 'login');
    }

    try {
        return {
            token,
            cache: await apollo(token).query({
                query: gql,
            }),
        };
    } catch (e) {
        if (
            e.graphQLErrors &&
            e.message &&
            e.message.indexOf('Request failed with status code 401') > 0
        ) {
            console.log('-> login');
            return this_component.redirect(302, 'login');
        }
        throw e;
    }
};
