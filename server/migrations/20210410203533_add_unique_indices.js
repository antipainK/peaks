module.exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.index(['email']);
  });

  await knex.schema.table('participantsExpeditions', (table) => {
    table.index(['userId', 'expeditionId']);
  });

  await knex.schema.table('expeditionInvites', (table) => {
    table.index(['expeditionId', 'fromId', 'toId']);
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
