const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const oauthRouter = require('./routers/oauthRouter');
const config = require('./config/config');

const sessionOptions = {
  secret: config.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  proxy: config.NODE_ENV === 'production',
  cookie: {
    secure: config.NODE_ENV === 'production',
  },
};

const corsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
};

const app = express();
app.set('trust proxy', 1);
const buildPath = path.join(__dirname, '../build');

if (config.NODE_ENV !== 'production') {
  app.use(cors(corsOptions));
}
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.static('build'));

app.use('/auth/google', oauthRouter);

if (config.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = app;
