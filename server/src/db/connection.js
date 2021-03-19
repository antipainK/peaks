const knex = require('knex');
const knexConfig = require('./knexfile');
const { performance } = require('perf_hooks');
const { Model } = require('objection');

const knex = knex(knexConfig);

/* Log queries with time. */
const startByUid = {};
knex.on('query', query => {
  startByUid[query.__knexQueryUid] = performance.now();
}).on('query-response', (response, query) => {
  const endTime = performance.now();
  const startTime = startByUid[query.__knexQueryUid];
  console.log(`[${(endTime - startTime).toFixed(3)} ms] ${query.sql}`);
});

Model.knex(knex);

module.exports = { knex };
