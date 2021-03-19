module.exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('displayName').notNullable();
    table.string('city').notNullable().defaultTo('');
    table.string('contact').notNullable().defaultTo('');
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
