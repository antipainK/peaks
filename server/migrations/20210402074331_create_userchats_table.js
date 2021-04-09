module.exports.up = async (knex) => {
  await knex.schema.createTable('userChats', (table) => {
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
    table.primary(['userUuid', 'chatUuid']);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('userChats');
};
