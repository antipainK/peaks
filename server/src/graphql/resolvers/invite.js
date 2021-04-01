const Invite = require('../../db/models/invite');

const inviteResolvers = {
  Query: {
    singleInvite: async (parent, { id }, ctx) => {
      const invite = Invite.query().findById(id);
      if (invite) {
        return invite;
      } else {
        throw new Error('No invite found');
      }
    },
    invitesSent: async (parent, { userId }, ctx) => {
      const invites = Invite.query().where('from', userId).orderBy('timestamp');
      if (invites) {
        return invites;
      } else {
        throw new Error('No invites sent');
      }
    },
    invitesRecived: async (parent, { userId }, ctx) => {
      const invites = Invite.query().where('to', userId).orderBy('timestamp');
      if (invites) {
        return invites;
      } else {
        throw new Error('No invites recived');
      }
    },
  },
  Mutation: {
    addInvite: async (parent, { input }, ctx) => {
      const invite = Invite.query().insert(input);
      return invite;
    },
    deleteInviteById: async (parent, { id }, ctx) => {
      const invite = Invite.query().deleteById(id);
      return invite;
    },
    deleteInvite: async (parent, { input }, ctx) => {
      const invite = Invite.query().delete().where(input);
      return invite;
    },
  },
};

module.exports = inviteResolvers;
