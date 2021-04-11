module.exports.up = async (knex) => {
  await knex.schema.createTable('expeditions', (table) => {
    table.increments('id').primary();
    table.integer('authorId').notNullable().references('users.id');
    table.integer('peakId').notNullable().references('peaks.id');
    table.datetime('date', { useTz: false }).notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable().defaultTo('');
    table.integer('maxParticipants').unsigned().notNullable().defaultTo(1);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('expeditions');
};
