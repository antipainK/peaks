
module.exports.up = async (knex) => {
    await knex.schema.createTable('participants', (table) =>{
        table.increments('id').primary();
        table.integer('participantId').notNullable().references('users.id');
        table.integer('expeditionId').notNullable().references('expeditions.id');
      });
};

module.exports.down = async (knex) => {
  knex.schema.dropTable('participants');
};
