require('dotenv').config();

const { NODE_ENV, PORT, DATABASE_URI } = process.env;

module.exports = {
  NODE_ENV: NODE_ENV || 'development',
  PORT: PORT || 4000,
  DATABASE_URI:
    DATABASE_URI || 'postgres://postgres:postgres@database:5432/postgres',
  GOOGLE_OAUTH_ID: 
    '818990647335-uqmsgrbdig86cdotmtjtosgodec78hl9.apps.googleusercontent.com'
};
