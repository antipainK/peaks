const { Router, query } = require('express');
const { OAuth2Client } = require('google-auth-library');
const User = require('../db/models/user');
const config = require('../config/config');

const router = Router();

const oauthClient = new OAuth2Client({
  clientId: config.GOOGLE_OAUTH_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: config.GOOGLE_OAUTH_REDIRECT_URI,
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

router.get('/login', async (req, res) => {
  const oauthUrl = oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URI,
  });
  res.redirect(oauthUrl);
});

router.get('/callback', async (req, res) => {
  // LOGIN
  const responseFromGoogle = await oauthClient.getToken(req.query.code);
  const tokens = responseFromGoogle.tokens;

  const ticket = await oauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: config.GOOGLE_OAUTH_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  try {
    const userInTheDatabase = await User.query().findOne({ email: email });
    if (userInTheDatabase == undefined) {
      await User.query().insert({
        // REGISTER
        displayName: name,
        email: email,
        photoUrl: picture,
      });
      res.status(201).json({
        status: 'success',
        message: 'Registration successful.',
        data: { name: name, email: email, photoUrl: picture },
      });
    } else {
      // TODO LOGIN HERE

      await userInTheDatabase.$query().patch({ photoUrl: picture });

      res.status(202).json({
        status: 'success',
        message: 'Logging in successful.',
        data: userInTheDatabase,
      });
    }
    // We need to decide, whether we want to use this cookie-parser.
    // docker-compose -f docker-compose.dev.yml exec server npm install express-session cookie-parser
    //req.session.userId = knex('users').select({id: 'id', email: 'email'}).where('email', email).first().select('id')
  } catch (error) {
    res.status(500).json({ status: 'failure', error: error });
    return;
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
  // LOGOUT
  try {
    req.session.destroy();
    res.status(200).json({
      status: 'success',
      message: `You've been logged out successfully!`,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: `There's been a problem during logging you out. Contact developers.`,
    });
  }
});

module.exports = router;
