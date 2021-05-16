exports.up = async function (knex) {
  await knex.schema.table('trackPhotos', (table) => {
    table
      .datetime('timestamp', { useTz: false })
      .notNullable()
      .defaultTo(knex.fn.now());

    table.string('description').notNullable().defaultTo('');
  });
};

exports.down = async function (knex) {
  await knex.schema.table('trackPhotos', (table) => {
    table.dropColumn('timestamp');
    table.dropColumn('description');
  });
};
