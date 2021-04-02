module.exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.uuid('uuid').defaultTo(knex.raw('(gen_random_uuid())')).unique();
    // Postgresql function to generate random uuids
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('uuid');
  });
};
