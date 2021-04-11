module.exports.up = async (knex) => {
  await knex.schema.createTable('userChats', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('chatId').references('id').inTable('chats').onDelete('CASCADE');
    table.unique(['userId', 'chatId']);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('userChats');
};
