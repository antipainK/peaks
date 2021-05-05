module.exports.up = async (knex) => {
    await knex.schema.table('expeditions', (table) => {
      table.uuid('chatId').references('chats.id');
    });
  };
  
  module.exports.down = async (knex) => {
    await knex.schema.table('expeditions', (table) => {
      table.dropColumn('chatId');
    });
  };
  