module.exports.up = async (knex) => {
  await knex.schema.createTable('invites', (table) => {
    table.increments('id').primary();
    table.integer('from').notNullable().references('users.id');
    table.integer('to').notNullable().references('users.id');
    table.integer('expeditionId').notNullable().references('expeditions.id');
    table.datetime('timestamp', { useTz: false }).notNullable();
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('invites');
};
