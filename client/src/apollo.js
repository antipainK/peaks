import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { serverUrl, socketServerUrl } from './utils/const';

const httpLink = new HttpLink({
  uri: `${serverUrl}/api`,
  credentials:
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
});

const wsLink = new WebSocketLink({
  uri: `${socketServerUrl}/api`,
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

/* We're aiming for 'cache-and-network' fetchPolicy but it introduces some problems for now
   such as page reloading, so we're staying with the default 'cache-first'
*/
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      /* This prevents "Cache data may be lost" Apollo warning from being triggered
         since it's unreasonable in this context
      */
      User: {
        fields: {
          receivedExpeditionInvites: {
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  link: splitLink,
  /* defaultOptions: {
     watchQuery: {
       // Fetch data from cache if available, but always perform a request
       // to get the latest data.
       fetchPolicy: 'cache-and-network',
     },
  },*/
});

export default client;
