module.exports.up = async (knex) => {
    await knex.schema.createTable('peaks', (table) =>{
        table.increments('id').primary();
        table.string('name', 128).notNullable();
        table.float('longitude', 8).notNullable();
        table.float('latitude', 8).notNullable();
        table.integer('abs_height').notNullable();
        table.text('description');
        table.string('mountain_range', 128);
      });
};

module.exports.down = async (knex) => {
    await knex.schema.dropTable('peaks');
};
