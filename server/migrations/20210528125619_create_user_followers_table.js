exports.up = async function (knex) {
  await knex.schema.createTable('userFollowers', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('fromId').notNullable().references('users.id');
    table.uuid('toId').notNullable().references('users.id');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('userFollowers');
};
