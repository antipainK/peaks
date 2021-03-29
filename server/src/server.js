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
const oauthClient = new OAuth2Client({
  clientId: config.GOOGLE_OAUTH_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:4000/auth/google/callback',
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

// Te komendy użyłem na dockerze, nie jestem pewny, czy trzeba je gdzieś wpisać w jakiś plik config
// docker-compose -f docker-compose.dev.yml exec server npm install google-auth-library
// docker-compose -f docker-compose.dev.yml exec server npm install express-session cookie-parser

app.get('/login', async (req, res) => {
  const temp_adress = oauthClient.generateAuthUrl({
    access_type: 'offline',
    //prompt: 'consent',
    scope: scopes,
    redirect_uri: 'http://localhost:4000/auth/google/callback',
  });
  res.redirect(temp_adress);
});

// LOGIN
app.get('/auth/google/callback', async (req, res) => {
  const responseFromGoogle = await oauthClient.getToken(req.query.code);
  const tokens = responseFromGoogle.tokens;

  const ticket = await oauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.GOOGLE_OAUTH_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  return knex('users')
    .insert({
      email: email,
      displayName: name,
      photoURL: picture,
    })
    .then(() => {
      //req.session.userId = knex('users').select({id: 'id', email: 'email'}).where('email', email).first().select('id')

      console.log(
        'Logowanie z Google: name: ' +
          name +
          '; email: ' +
          email +
          '; picture: ' +
          picture
      );
      res
        .status(201)
        .json({
          status: 'success',
          data: { name: name, email: email, photoURL: picture },
        });
    })
    .catch(() => {
      res.status(500).json({ status: 'failure' });
    });
});

// This middleware makes sure, we get access to user body, when processing his request
/*
app.use(async (req, res, next) => {
  const user = await knex('users').where('id', req.session.userId).first()
  req.user = user
  next()
})
*/

// LOGOUT
app.delete('/auth/google/logout', async (req, res) => {
  return req.session
    .destroy()
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: `You've been logged out successfully!`,
      });
    })
    .catch(() => {
      res.status(500).json({
        status: 'failure',
        message: `There's been a problem during logging you out. Contact developers.`,
      });
    });
});

app.get('/', async (req, res) => {
  res.status(500).send('<a href="/login">Login with Google</a>');
});
