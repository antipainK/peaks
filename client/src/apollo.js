import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { serverUrl } from './utils/const';

const httpLink = new HttpLink({
  uri: `${serverUrl}/api`,
  credentials:
    process.env.NODE_ENV === 'production' ? 'same-origin' : 'include',
});

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
  link: httpLink,
  /* defaultOptions: {
     watchQuery: {
       // Fetch data from cache if available, but always perform a request
       // to get the latest data.
       fetchPolicy: 'cache-and-network',
     },
  },*/
});

export default client;
