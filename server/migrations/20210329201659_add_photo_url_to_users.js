module.exports.up = async (knex) => {
  await knex.schema.table('users', (table) => {
    table
      .string('photoUrl')
      .notNullable()
      .defaultTo(
        'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
      );
  });
};

module.exports.down = async (knex) => {
  await knex.schema.table('users', (table) => {
    table.dropColumn('photoUrl');
  });
};
