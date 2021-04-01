const { Router, query } = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../db/models/user');
const config = require('../config/config');

const router = Router();

const oAuthClient = new OAuth2Client({
  clientId: config.GOOGLE_OAUTH_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: config.GOOGLE_OAUTH_REDIRECT_URI,
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

router.get('/login', async (req, res) => {
  const oAuthUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URI,
  });

  res.redirect(oAuthUrl);
});

router.get('/callback', async (req, res) => {
  const responseFromGoogle = await oAuthClient.getToken(req.query.code);
  const tokens = responseFromGoogle.tokens;

  const ticket = await oAuthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.GOOGLE_OAUTH_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  try {
    const userInTheDatabase = await User.query().findOne({ email: email });

    if (!userInTheDatabase) {
      await User.query().insert({
        displayName: name,
        email: email,
        photoUrl: picture,
      });

      res.status(201).send({
        status: 'success',
        message: 'Registration successful.',
        data: { name: name, email: email, photoUrl: picture },
      });
    } else {
      await userInTheDatabase.$query().patch({ photoUrl: picture });

      res.status(202).send({
        status: 'success',
        message: 'Logging in successful.',
        data: userInTheDatabase,
      });
    }

    // TODO: Put auth stuff in the session
    // TODO: Redirect to CLIENT_URL

    // req.session.userId = knex('users').select({id: 'id', email: 'email'}).where('email', email).first().select('id')
  } catch (error) {
    res.status(500).send({ status: 'failure', error });
  }
});

// This middleware makes sure, we get access to user body, when processing his request
/*
  app.use(async (req, res, next) => {
    const user = await knex('users').where('id', req.session.userId).first()
    req.user = user
    next()
  })
  */

router.delete('/logout', async (req, res) => {
  req.session.destroy();

  // TODO: Redirect to CLIENT_URL
  res.send({
    status: 'success',
    message: `You've been logged out successfully!`,
  });
});

module.exports = router;
