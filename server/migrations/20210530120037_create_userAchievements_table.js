module.exports.up = async (knex) => {
    await knex.schema.createTable('userAchievements', (table) => {
      table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
      table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
      table
        .uuid('achievementId')
        .references('id')
        .inTable('achievements')
        .onDelete('CASCADE');
      table
        .datetime('timestamp', { useTZ: false, precision: 6 })
        .defaultTo(knex.fn.now(6));
    });
  };
  
  module.exports.down = async (knex) => {
    await knex.schema.dropTable('userAchievements');
  };
  