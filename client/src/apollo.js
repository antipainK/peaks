import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:4000/api',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  defaultOptions: {
    watchQuery: {
      // Fetch data from cache if available, but always perform a request
      // to get the latest data.
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;