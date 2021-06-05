exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex('achievements').del();
  // Inserts seed entries
  await knex('achievements').insert([
    {
      title: 'Łysica',
      description: 'Zdobądź Łysicę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Łysica'),
      type: 'PEAK',
    },
    {
      title: 'Ślęża',
      description: 'Zdobądź Ślężę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Slęża'),
      type: 'PEAK',
    },
    {
      title: 'Skopiec',
      description: 'Zdobądź Skopiec, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Skopiec'),
      type: 'PEAK',
    },
    {
      title: 'Kłodzka Góra',
      description: 'Zdobądź Kłodzką Górę, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Kłodzka Góra'),
      type: 'PEAK',
    },
    {
      title: 'Chełmiec',
      description: 'Zdobądź Chełmiec, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Chełmiec'),
      type: 'PEAK',
    },
    {
      title: 'Biskupia Kopa',
      description: 'Zdobądź Biskupią Kopę, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Biskupia Kopa'),
      type: 'PEAK',
    },
    {
      title: 'Lubomir',
      description: 'Zdobądź Lubomir, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Lubomir'),
      type: 'PEAK',
    },
    {
      title: 'Szczeliniec Wielki',
      description: 'Zdobądź SzczeliniecWielki, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Szczeliniec Wielki'),
      type: 'PEAK',
    },
    {
      title: 'Czupel',
      description: 'Zdobądź Czupel, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Czupel'),
      type: 'PEAK',
    },
    {
      title: 'Waligóra',
      description: 'Zdobądź Waligórę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Waligóra'),
      type: 'PEAK',
    },
    {
      title: 'Skalnik',
      description: 'Zdobądź Skalnik, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Skalnik'),
      type: 'PEAK',
    },
    {
      title: 'Jagodna',
      description: 'Zdobądź JAgodnę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Jagodna'),
      type: 'PEAK',
    },
    {
      title: 'Kowadło',
      description: 'Zdobądź Kowadło, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Kowadło'),
      type: 'PEAK',
    },
    {
      title: 'Lackowa',
      description: 'Zdobądź Lackową, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Lackowa'),
      type: 'PEAK',
    },
    {
      title: 'Wielka Sowa',
      description: 'Zdobądź Wielką Sowę, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Wielka Sowa'),
      type: 'PEAK',
    },
    {
      title: 'Wysoka (Wysokie Skałki)',
      description: 'Zdobądź Wysoką, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Wysoka (Wysokie Skałki)'),
      type: 'PEAK',
    },
    {
      title: 'Orlica',
      description: 'Zdobądź Orlicę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Orlica'),
      type: 'PEAK',
    },
    {
      title: 'Rudawiec',
      description: 'Zdobądź Rudawiec, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Rudawiec'),
      type: 'PEAK',
    },
    {
      title: 'Wysoka Kopa',
      description: 'Zdobądź Wysoką Kopę, aby uzyskać to odznaczenie',
      metaId: await knex
        .select('id')
        .from('peaks')
        .where('name', 'Wysoka Kopa'),
      type: 'PEAK',
    },
    {
      title: 'Mogielnica',
      description: 'Zdobądź Mogielnicę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Mogielnica'),
      type: 'PEAK',
    },
    {
      title: 'Skrzyczne',
      description: 'Zdobądź Skrzyczne, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Skrzyczne'),
      type: 'PEAK',
    },
    {
      title: 'Radziejowa',
      description: 'Zdobądź Radziejową, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Radziejowa'),
      type: 'PEAK',
    },
    {
      title: 'Turbacz',
      description: 'Zdobądź Turbacz, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Turbacz'),
      type: 'PEAK',
    },
    {
      title: 'Tarnica',
      description: 'Zdobądź Tarnicę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Tarnica'),
      type: 'PEAK',
    },
    {
      title: 'Śnieżnik',
      description: 'Zdobądź Śnieżnik, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Śnieżnik'),
      type: 'PEAK',
    },
    {
      title: 'Śnieżka',
      description: 'Zdobądź Śnieżkę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Śnieżka'),
      type: 'PEAK',
    },
    {
      title: 'Babia Góra',
      description: 'Zdobądź Babią Górę, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Babia Góra'),
      type: 'PEAK',
    },
    {
      title: 'Rysy',
      description: 'Zdobądź Rysy, aby uzyskać to odznaczenie',
      metaId: await knex.select('id').from('peaks').where('name', 'Rysy'),
      type: 'PEAK',
    },
  ]);
};
