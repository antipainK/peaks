const { AuthenticationError } = require('apollo-server-errors');
const Expedition = require('../../db/models/expedition');

const expeditionResolvers = {
  Expedition: {
    peak: async (parent, { id }, ctx) => {
      return parent.$relatedQuery('peak');
    },

    participants: async (parent, { id }, ctx) => {
      return parent.$relatedQuery('participants');
    },
  },
  Query: {
    expedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().findById(id);

      if (!expedition) {
        throw new Error('Expedition not found');
      }

      return expedition;
    },

    expeditions: async (parent, { filter = {} }, ctx) => {
      let expeditions = Expedition.query();

      if (filter.fromDate) {
        expeditions = expeditions.where('date', '>=', filter.fromDate);
      }

      if (filter.toDate) {
        expeditions = expeditions.where('date', '<=', filter.toDate);
      }

      return await expeditions;
    },
  },
  Mutation: {
    createExpedition: async (parent, { input }, ctx) => {
      if (!userId) throw new AuthenticationError('Not authenticated');

      const expedition = await Expedition.query().insert(input);
      return expedition;
    },

    updateExpedition: async (parent, { input }, ctx) => {
      const expedition = await Expedition.query().findById(id);

      if (!expedition) {
        return new Error('Expedition not found');
      }

      if (expedition.authorId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      const { id, ...attributes } = input;

      const updatedExpedition = expedition
        .$query()
        .patch(attributes)
        .returning('*');
      return updatedExpedition;
    },

    deleteExpedition: async (parent, { id }, ctx) => {
      const expedition = await Expedition.query().deleteById(id).returning('*');

      if (!expedition) {
        throw new Error('Expedition not found');
      }

      return expedition;
    },

    signUpForExpedition: async (parent, { expeditionId }, ctx) => {
      const expedition = await Expedition.query()
        .findById(expeditionId)
        .withGraphFetched('participants');

      if (!expedition) {
        throw new Error('Expedition not found');
      }

      if (expedition.participants.length >= expedition.maxParticipants) {
        throw new Error('Participants limit already reached');
      }

      const isSignedUp = expedition.participants.some(
        (user) => user.id === ctx.userId
      );

      if (isSignedUp) {
        throw new Error('Already signed up for this expedition');
      }

      await expedition.$relatedQuery('participants').relate(ctx.userId);

      return expedition;
    },

    signOffFromExpedition: async (parent, { expeditionId }, ctx) => {
      const expedition = await Expedition.query()
        .findById(expeditionId)
        .withGraphFetched('participants');

      if (!expedition) {
        throw new Error('Expedition not found');
      }

      const isSignedUp = expedition.participants.some(
        (user) => user.id === ctx.userId
      );

      if (!isSignedUp) {
        throw new Error('Not signed up for this expedition');
      }

      await expedition
        .$relatedQuery('participants')
        .unrelate()
        .where('userId', ctx.userId);

      return expedition;
    },
  },
};

module.exports = expeditionResolvers;