module.exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.unique(['email']);
  });

  await knex.schema.table('participantsExpeditions', (table) => {
    table.unique(['userId', 'expeditionId']);
  });

  await knex.schema.table('expeditionInvites', (table) => {
    table.unique(['expeditionId', 'fromId', 'toId']);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropIndex(['email']);
  });

  await knex.schema.table('participantsExpeditions', (table) => {
    table.dropIndex(['userId', 'expeditionId']);
  });

  await knex.schema.table('expeditionInvites', (table) => {
    table.dropIndex(['expeditionId', 'fromId', 'toId']);
  });
};
