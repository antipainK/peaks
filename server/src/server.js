const config = require('./config/config');

require('./db/connection');

const fs = require('fs');
const path = require('path');
const http = require('http');
const { ApolloServer, gql } = require('apollo-server-express');
const app = require('./app');
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


const { OAuth2Client } = require('google-auth-library');
const { knex } = require('./db/connection');
const oauthClient = new OAuth2Client(config.GOOGLE_OAUTH_ID)


// Te komendy użyłem na dockerze, nie jestem pewny, czy trzeba je gdzieś wpisać w jakiś plik config
// docker-compose -f docker-compose.dev.yml exec server npm install google-auth-library
// docker-compose -f docker-compose.dev.yml exec server npm install express-session cookie-parser




// LOGIN
app.post('/api/v1/auth/google', async (req, res) =>{

  const {token} = req.body
  const ticket = await oauthClient.verifyIdToken({
    idToken: token,
    audience: config.GOOGLE_OAUTH_ID
  });
  const {name, email, picture} = ticket.getPayload();

  return knex('users').insert({
    email: email,
    displayName: name

  }).then(()=>{
    req.session.userId = knex('users').select({id: 'id', email: 'email'}).where('email', email).first().select('id')

    console.log("name: " + name + "; email: " + email + "; picture: " + picture)
    res.status(201).json(user)

  }).catch(() => {
    res.status(500).json({status: "failure"})
  })
})


// This middleware makes sure, we get access to user body, when processing his request
/*
app.use(async (req, res, next) => {
  const user = await knex('users').where('id', req.session.userId).first()
  req.user = user
  next()
})
*/

// LOGOUT
app.delete('/api/v1/auth/logout', async (req, res) => {
  return req.session.destroy().then(()=>{
    res.status(200).json({
      status: 'success',
      message: `You've been logged out successfully!`
    })
  }).catch(()=>{
    res.status(500).json({
      status: 'failure',
      message: `There's been a problem during logging you out. Contact developers.`
    })
  })
})
