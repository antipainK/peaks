module.exports.up = async (knex) => {
  await knex.schema.createTable('expeditions', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('authorId').notNullable().references('users.id');
    table.uuid('peakId').notNullable().references('peaks.id');
    table.datetime('date', { useTz: false }).notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable().defaultTo('');
    table.integer('maxParticipants').unsigned().notNullable().defaultTo(1);
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('expeditions');
};
