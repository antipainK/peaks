module.exports.up = async (knex) => {
  await knex.schema.table('expeditionInvites', (table) => {
    table.renameColumn('from', 'fromId');
    table.renameColumn('to', 'toId');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('expeditionInvites', (table) => {
    table.renameColumn('fromId', 'from');
    table.renameColumn('toId', 'to');
  });
};
