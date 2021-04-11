module.exports.up = async (knex) => {
  await knex.schema.createTable('expeditionInvites', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('from').notNullable().references('users.id');
    table.uuid('to').notNullable().references('users.id');
    table.uuid('expeditionId').notNullable().references('expeditions.id');
    table
      .datetime('timestamp', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('expeditionInvites');
};
