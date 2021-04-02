module.exports.up = async (knex) => {
  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table
      .uuid('userUuid')
      .references('uuid')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('chatUuid')
      .references('uuid')
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
