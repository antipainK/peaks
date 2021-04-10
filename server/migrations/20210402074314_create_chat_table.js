module.exports.up = async (knex) => {
  await knex.schema.createTable('chats', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.string('name').notNullable().defaultTo('OurChat');
    table
      .datetime('createdAt', { useTz: false, precision: 6 })
      .defaultTo(knex.fn.now(6));
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('chats');
};
