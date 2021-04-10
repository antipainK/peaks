const ExpeditionInvite = require('../../db/models/expeditionInvite');

const expeditionInviteResolvers = {
  ExpeditionInvite: {
    from: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('from');
    },

    to: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('to');
    },

    expedition: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('expedition');
    },
  },
  Query: {},
  Mutation: {
    createExpeditionInvite: async (parent, { input }, ctx) => {
      const attrs = { ...input, fromId: ctx.userId };
      const invite = await ExpeditionInvite.query().insert(attrs);
      return invite;
    },

    deleteExpeditionInvite: async (parent, { id }, ctx) => {
      const invite = await ExpeditionInvite.query().deleteById(id);
      return invite;
    },
  },
};

module.exports = expeditionInviteResolvers;
