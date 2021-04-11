module.exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.index(['id']);
  });

  await knex.schema.table('messages', (table) => {
    table.index(['chatId']);
  });

  await knex.schema.table('userChats', (table) => {
    table.index(['userId']);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropIndex(['id']);
  });

  await knex.schema.table('messages', (table) => {
    table.dropIndex(['chatId']);
  });

  await knex.schema.table('userChats', (table) => {
    table.dropIndex(['userId']);
  });
};
