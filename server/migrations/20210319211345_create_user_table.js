module.exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    // Postgresql function to generate random uuids
    table.string('email').notNullable().unique();
    table.string('displayName').notNullable();
    table.string('city').notNullable().defaultTo('');
    table.string('contact').notNullable().defaultTo('');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
