module.exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('displayName').notNullable();
    table.string('city').notNullable().defaultTo('');
    table.string('contact').notNullable().defaultTo('');
    table
      .string('photoURL')
      .notNullable()
      .defaultTo(
        'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
      );
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
