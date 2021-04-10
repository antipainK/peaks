const { AuthenticationError } = require('apollo-server-errors');
const Expedition = require('../../db/models/expedition');
const User = require('../../db/models/user');
const ParticipantExpedition = require('../../db/models/participantExpedition');
const ExpeditionInvite = require('../../db/models/expeditionInvite');

const userResolvers = {
  User: {
    authoredExpeditions: async (parent, { id }, ctx) => {
      const authoredExpeditions = await Expedition.query().where(
        'authorId',
        id
      );
      if (authoredExpeditions) {
        return authoredExpeditions;
      } else {
        throw new Error('NO expeditions authored');
      }
    },

    participatedExpeditions: async (parent, { id }, ctx) => {
      const participatedExpeditions = await ParticipantExpedition.query()
        .select('expeditions.*')
        .join(
          'expeditions',
          'participantsExpeditions.expeditionId',
          'expeditions.id'
        )
        .where('userId', id);
      if (participatedExpeditions) {
        return participatedExpeditions;
      } else {
        throw new Error('No expeditions participated');
      }
    },

    expeditionInvitesSent: async (parent, { id }, ctx) => {
      const expeditionInvitesSent = await ExpeditionInvite.query().where(
        'from',
        id
      );
      if (expeditionInvitesSent) {
        return expeditionInvitesSent;
      } else {
        throw new Error('No invites sent');
      }
    },

    expeditionInvitesRecived: async (parent, { id }, ctx) => {
      const expeditionInvitesRecived = await ExpeditionInvite.query().where(
        'to',
        id
      );
      if (expeditionInvitesRecived) {
        return expeditionInvitesRecived;
      } else {
        throw new Error('No invites recived');
      }
    },
  },

  Query: {
    me: async (parent, args, { userId }) => {
      if (!userId) return null;

      return await User.query().findById(userId);
    },

    user: async (parent, { id }) => {
      const user = await User.query().findById(id);

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    },

    users: async (parent, args, ctx) => {
      const users = await User.query();
      return users;
    },
  },

  Mutation: {
    updateMe: async (parent, { input }, { userId }) => {
      if (!userId) throw new AuthenticationError('not authenticated');
      const updatedUser = await User.query().patchAndFetchById(userId, input);

      return updatedUser;
    },
  },
};

module.exports = userResolvers;
