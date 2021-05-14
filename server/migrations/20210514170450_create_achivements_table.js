
module.exports.up = async (knex) => {
    await knex.schema.createTable('achivements', (table)=>{
      table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
      table.string('title').notNullable();
      table.string('description');
      table.uuid('peakId').references('id').inTable('peaks').onDelete('CASCADE');
      table.enu('type' , ['Peak', 'Special']);
    });
  };
  
  module.exports.down = async (knex) =>{
    await knex.schema.dropTable('achivements');
  };
