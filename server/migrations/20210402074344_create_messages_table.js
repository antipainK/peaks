module.exports.up = async (knex) => {
  await knex.schema.createTable('messages', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('chatId')
      .references('id')
      .inTable('chats')
      .onDelete('CASCADE');
    table.text('content').notNullable();
    table
      .datetime('time', { useTz: false, precision: 6 })
      .defaultTo(knex.fn.now(6));
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('messages');
};
