module.exports.up = async (knex) => {
  await knex.schema.createTable('peaks', (table) => {
    table.increments('id').primary();
    table.string('name', 128).notNullable();
    table.float('longitude', 8).notNullable();
    table.float('latitude', 8).notNullable();
    table.integer('absHeight').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.string('mountainRange', 128).notNullable().defaultTo('');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('peaks');
};
