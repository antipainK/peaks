const Expedition = require('../../db/models/expedition');
const ExpeditionInvite = require('../../db/models/expeditionInvite');
const User = require('../../db/models/user');

const expeditionInviteResolvers = {
  ExpeditionInvite: {
    from: async (parent, { id }, ctx) => {
      return await User.query().findById(id);
    },
    to: async (parent, { id }, ctx) => {
      return await User.query().findById(id);
    },
    expedition: async (parent, { id }, ctx) => {
      return await Expedition.query().findById(id);
    },
  },
  Query: {
    singleExpeditionInvite: async (parent, { id }, ctx) => {
      const invite = await ExpeditionInvite.query().findById(id);
      if (invite) {
        return invite;
      } else {
        throw new Error('No invite found');
      }
    },
  },
  Mutation: {
    addExpeditionInvite: async (parent, { input }, ctx) => {
      const invite = await ExpeditionInvite.query().insert(input);
      return invite;
    },
    deleteExpeditionInviteById: async (parent, { id }, ctx) => {
      const invite = await ExpeditionInvite.query().deleteById(id);
      return invite;
    },
    deleteExpeditionInvite: async (parent, { input }, ctx) => {
      const invite = await ExpeditionInvite.query().delete().where(input);
      return invite;
    },
  },
};

module.exports = expeditionInviteResolvers;
