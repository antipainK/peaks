const config = require('./config/config');
require('./db/connection');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { ApolloServer, gql, PubSub } = require('apollo-server-express');
const app = require('./app');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: gql(
    fs.readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf8')
  ),
  resolvers,
  subscriptions: {
    path: '/api',
  },
  context: async ({ req, connection }) => {
    if (connection) {
      /* For subscriptions over websocket. */
      return { pubsub };
    } else {
      /* For queries and mutations over http. */
      const { userId } = req.session;
      return { userId, pubsub };
    }
  },
});

server.applyMiddleware({
  app,
  path: '/api',
  cors: { origin: config.CLIENT_URL, credentials: true },
});

const httpServer = http.createServer(app);

httpServer.listen({ port: config.PORT }, () =>
  console.log(`Server running at port ${config.PORT}`)
);
