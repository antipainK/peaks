module.exports.up = async (knex) => {
  await knex.schema.createTable('expeditionPhotos', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table
      .uuid('expeditionId')
      .references('id')
      .inTable('expeditions')
      .onDelete('CASCADE');
    table.float('longitude', 8).notNullable();
    table.float('latitude', 8).notNullable();
    table.string('photoUrl').notNullable().defaultTo('');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('expeditionPhotos');
};
