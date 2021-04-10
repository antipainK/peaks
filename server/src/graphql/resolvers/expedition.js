const Expedition = require('../../db/models/expedition');
const Peak = require('../../db/models/peak');

const expeditionResolvers = {
  Expedition: {
    peak: async (parent, { id }, ctx) => {
      return await Peak.query().findById(id);
    },
    participants: async (parent, { id }, ctx) => {
      return await ParticipantExpedition.query()
        .select('users.*')
        .join('users', 'participantsExpeditions.userId', 'users.id')
        .where('expeditionId', id);
    },
  },
  Query: {
    expedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().findById(id);
      if (expedition) {
        return expedition;
      } else {
        throw new Error('No expedition found');
      }
    },
    expeditions: async (parent, { fromDate, toDate }, ctx) => {
      let expeditions = Expedition.query();
      if (fromDate) {
        expeditions = expeditions.where('date', '>=', fromDate);
      }
      if (toDate) {
        expeditions = expeditions.where('date', '<=', fromDate);
      }
      if (expeditions) {
        return await expeditions;
      } else {
        throw new Error('No expeditions found');
      }
    },
  },
  Mutation: {
    cancelExpedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().deleteById(id);
      return expedition;
    },
    addExpedition: async (parent, { input }, ctx) => {
      const expedition = await Expedition.query().insert(input);
      return expedition;
    },
    updateExpedition: async (parent, { input }, ctx) => {
      const { id, ...attributes } = input;
      const expedition = await Expedition.query().patchAndFetchById(
        id,
        attributes
      );
      return expedition;
    },
  },
};

module.exports = expeditionResolvers;
