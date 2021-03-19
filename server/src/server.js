require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const { ApolloServer, gql } = require('apollo-server-express');
const app = require('./app');
const config = require('./config/config');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs: gql(
    fs.readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf8')
  ),
  resolvers,
});

server.applyMiddleware({ app, path: '/api' });

const httpServer = http.createServer(app);

httpServer.listen({ port: config.PORT }, () =>
  console.log(`Server running at port ${config.PORT}`)
);
