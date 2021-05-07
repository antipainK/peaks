
module.exports.up = async (knex) => {
  await knex.schema.crateTable( 'userPeakAchivements', (table) =>{
    table.uuid('id').defaultTo(knex.raw('(gen_random_uuid())')).primary();
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE');
    table.uuid('peakId').references('id').inTable('peaks').onDelete('CASCADE');
    table.datetime('timestamp', { useTZ: false, precision: 6 })
    .defaultTo(knex.fn.now(6));
  });
};

module.exports.down = async (knex) => {
  
};
