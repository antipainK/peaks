module.exports.up = async (knex) => {
  await knex.schema.createTable('achievements', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.string('title').notNullable();
    table.string('description').notNullable().defaultTo('');
    table.uuid('metaId').notNullable().defaultTo('');
    table.string('type').notNullable();
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('achievements');
};
