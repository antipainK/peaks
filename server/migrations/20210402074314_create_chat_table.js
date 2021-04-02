module.exports.up = async (knex) => {
  await knex.schema.createTable('chats', (table) => {
    table.uuid('uuid').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.string('name').notNullable().defaultTo('OurChat');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('chats');
};
