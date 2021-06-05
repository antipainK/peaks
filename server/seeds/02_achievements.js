exports.seed = async (knex) => {
  const [{ count }] = await knex('achievements').count();

  if (count > 0) {
    return;
  }

  const peaks = await knex.from('peaks');

  await knex('achievements').insert(
    peaks.map((peak) => ({
      title: `Zdobycie szczytu: ${peak.name}`,
      description: `Zdobądź szczyt ${peak.name}, aby uzyskać to odznaczenie`,
      metaId: peak.id,
      type: 'PEAK',
    }))
  );
};
