module.exports.up = async (knex) => {
  await knex.schema.createTable('participantsExpeditions', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('userId').notNullable().references('users.id');
    table.uuid('expeditionId').notNullable().references('expeditions.id');
  });
};

module.exports.down = async (knex) => {
  knex.schema.dropTable('participantsExpeditions');
};
