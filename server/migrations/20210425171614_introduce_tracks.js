module.exports.up = async (knex) => {
  await knex.schema.renameTable('participantsExpeditions', 'tracks');

  await knex.schema.table('tracks', table => {
    table.datetime('startedAt', { useTz: false, precision: 6 });
    table.datetime('endedAt', { useTz: false, precision: 6 });
  });

  await knex.schema.renameTable('expeditionLocations', 'trackLocations');

  await knex.schema.table('trackLocations', table => {
    table.uuid('trackId').references('id').inTable('tracks').onDelete('CASCADE');
    table.dropColumn('userId');
    table.dropColumn('expeditionId');
  });

  await knex.schema.renameTable('expeditionPhotos', 'trackPhotos');

  await knex.schema.table('trackPhotos', table => {
    table.uuid('trackId').references('id').inTable('tracks').onDelete('CASCADE');
    table.dropColumn('userId');
    table.dropColumn('expeditionId');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('trackPhotos', table => {
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table
      .uuid('expeditionId')
      .references('id')
      .inTable('expeditions')
      .onDelete('CASCADE');
    table.dropColumn('trackId');
  });

  await knex.schema.renameTable('trackPhotos', 'expeditionPhotos');

  await knex.schema.table('trackLocations', table => {
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table
      .uuid('expeditionId')
      .references('id')
      .inTable('expeditions')
      .onDelete('CASCADE');
    table.dropColumn('trackId');
  });

  await knex.schema.renameTable('trackLocations', 'expeditionLocations');

  await knex.schema.table('tracks', table => {
    table.dropColumn('startedAt');
    table.dropColumn('endedAt');
  });

  await knex.schema.renameTable('tracks', 'participantsExpeditions');
};
