module.exports.up = async (knex) => {
  await knex.schema.createTable('participantsExpeditions', (table) => {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('users.id');
    table.integer('expeditionId').notNullable().references('expeditions.id');
  });
};

module.exports.down = async (knex) => {
  knex.schema.dropTable('participantsExpeditions');
};
