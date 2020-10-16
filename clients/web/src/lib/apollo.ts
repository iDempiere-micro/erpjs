import fetch from 'isomorphic-fetch';
import ApolloClient from 'apollo-boost';

export const apollo = (token) => new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  fetch,
  request: (operation) => {
    operation.setContext({
      headers: token ? {
        authorization: `Bearer ${token}`
      } : {}
    })
  },
});


export const gqlQuery = async (this_component, session, gql) => {
  const { token } = session;

  if (!token) {
    return this_component.redirect(302, "login");
  }

  try {
  return {
    token,
    cache: await apollo(token).query({
      query: gql,
    }),
  };
  } catch (e) {
    if (e.graphQLErrors && e.message && e.message.indexOf('Request failed with status code 401') > 0) {
      console.log('-> login');
      return this_component.redirect(302, "login");
    }
    throw e;
  }  
}