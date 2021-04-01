require('dotenv').config();

const { NODE_ENV, PORT, DATABASE_URI, GOOGLE_CLIENT_SECRET } = process.env;

const serverConfig = {
  NODE_ENV: NODE_ENV || 'development',
  PORT: PORT || 4000,
};

const clientConfig = {
  CLIENT_URL:
    serverConfig.NODE_ENV === 'production'
      ? '/'
      : `http://localhost:${serverConfig.PORT}/`,
};

const dbConfig = {
  DATABASE_URI:
    DATABASE_URI || 'postgres://postgres:postgres@database:5432/postgres',
};

const authConfig = {
  GOOGLE_OAUTH_ID:
    '818990647335-uqmsgrbdig86cdotmtjtosgodec78hl9.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URI: `${clientConfig.CLIENT_URL}auth/google/callback`,
};

module.exports = {
  ...serverConfig,
  ...clientConfig,
  ...dbConfig,
  ...authConfig,
};
