import { RetryLink } from 'apollo-link-retry';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const retryIf = (error, operation) => {
  const doNotRetryCodes = [500, 400, 403, 404];
  return !!error && !doNotRetryCodes.includes(error.statusCode);
};
const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: 2000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf,
  },
});

export const _globalServerRootUri = { uri: '' };

export function useFactory(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache(),
    link: retryLink.concat(httpLink.create({
      uri: `${_globalServerRootUri.uri}/graphql`
    }))
  }
}

export const apolloProvider =
{
  provide: APOLLO_OPTIONS,
  useFactory,
  deps: [HttpLink]
};
