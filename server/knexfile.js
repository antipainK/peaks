/* Convert app camelCase <-> db snake_case automatic conversion. */
const knexStringcase = require('knex-stringcase');
const { DATABASE_URI } = require('./src/config/config');

module.exports = knexStringcase({
  client: 'postgresql',
  connection: DATABASE_URI,
  migrations: {
    tableName: 'migrations',
  },
});
