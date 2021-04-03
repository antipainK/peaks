const ExpeditionInvite = require('../../db/models/expeditionInvite');

const expeditionInviteResolvers = {
  Query: {
    singleExpeditionInvite: async (parent, { id }, ctx) => {
      const invite = Invite.query().findById(id);
      if (invite) {
        return invite;
      } else {
        throw new Error('No invite found');
      }
    },
  },
  Mutation: {
    addExpeditionInvite: async (parent, { input }, ctx) => {
      const invite = Invite.query().insert(input);
      return invite;
    },
    deleteExpeditionInviteById: async (parent, { id }, ctx) => {
      const invite = Invite.query().deleteById(id);
      return invite;
    },
    deleteExpeditionInvite: async (parent, { input }, ctx) => {
      const invite = Invite.query().delete().where(input);
      return invite;
    },
  },
};

module.exports = inviteResolvers;
