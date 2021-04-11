module.exports.up = async (knex) => {
  await knex.schema.table('participantsExpeditions', (table) => {
    table.unique(['userId', 'expeditionId']);
  });

  await knex.schema.table('expeditionInvites', (table) => {
    table.unique(['expeditionId', 'fromId', 'toId']);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('participantsExpeditions', (table) => {
    table.dropUnique(['userId', 'expeditionId']);
  });

  await knex.schema.table('expeditionInvites', (table) => {
    table.dropUnique(['expeditionId', 'fromId', 'toId']);
  });
};
