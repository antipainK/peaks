module.exports.up = async (knex) => {
  await knex.schema.createTable('reactions', (table) => {
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table
      .uuid('messageId')
      .references('id')
      .inTable('messages')
      .onDelete('CASCADE');
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');

    table
      .enu(
        'type',
        [
          'LIKE',
          'DISLIKE',
          'PLUSONE',
          'HEART',
          'CHILL',
          'ANGRY',
          'SADFACE',
          'POOP',
          'WOW',
        ],
        { useNative: true, enumName: 'reactionType' }
      )
      .notNullable();
  });
};

module.exports.down = async (knex) => {
  await knex.schema.dropTable('reactions');
};
