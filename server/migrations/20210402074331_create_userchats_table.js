module.exports.up = async (knex) => {
  await knex.schema.createTable('userChats', (table) => {
    table.uuid('uuid').defaultTo(knex.raw('(gen_random_uuid())')).primary();
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
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('userChats');
};
