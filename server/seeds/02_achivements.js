exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('achivements').del();
  await knex('achivements').insert([
    {
      title: 'Zdobyłeś Rysy',
      description: 'Zdobyłeś najwyższy Polski szczyt',
    },
  ]);
};
