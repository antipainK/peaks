const path = require('path');
const express = require('express');
const cors = require('cors');
const oAuthRouter = require('./routers/oAuthRouter');
const config = require('./config/config');

const app = express();
const buildPath = path.join(__dirname, '../build');

app.use(cors());
app.use(express.static('build'));

app.use('/auth/google', oAuthRouter);

if (config.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = app;
