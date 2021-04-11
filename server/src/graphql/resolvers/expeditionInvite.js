const { AuthenticationError } = require('apollo-server-errors');
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
      if (!ctx.userId) throw new AuthenticationError('Not authenticated');

      const attrs = { ...input, fromId: ctx.userId };
      const invite = await ExpeditionInvite.query()
        .insert(attrs)
        .returning('*');
      console.log('invite', invite);
      return invite;
    },

    deleteExpeditionInvite: async (parent, { id }, ctx) => {
      const invite = await ExpeditionInvite.query().findById(id);

      if (!invite) {
        return new Error('Invite not found');
      }

      if (invite.fromId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      await invite.$query().delete();

      return invite;
    },
  },
};

module.exports = expeditionInviteResolvers;
