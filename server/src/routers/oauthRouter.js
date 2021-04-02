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
    let user = await User.query().findOne({ email: email });

    if (!user) {
      user = await User.query().insert({
        displayName: name,
        email: email,
        photoUrl: picture,
      });
    } else {
      await user.$query().patch({ photoUrl: picture });
    }

    req.session.userId = user.id;
    res.redirect(config.CLIENT_URL);
  } catch (error) {
    res.status(500).send({ status: 'failure', error });
  }
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => res.sendStatus(200));
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
