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
    me: (parent, args, ctx) => {
      return {
        id: 0,
        email: 'test@example.com',
        displayName: 'marian',
        city: 'Radom',
        contact: '',
      };
    },
    user: async (parent, { id }, ctx) => {
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
    updateUser: async (parent, { input }, ctx) => {
      const { id, ...attributes } = input;
      const user = await User.query().patchAndFetchById(id, attributes);
      return user;
    },
  },
};

module.exports = userResolvers;
