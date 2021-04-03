const Expedition = require('../../db/models/expedition');
const User = require('../../db/models/user');
const ParticipantExpedition = require('../../db/models/participantExpedition');
const ExpeditionInvite = require('../../db/models/expeditionInvite');

const userResolvers = {
  User:{
authoredExpeditions: async (parent, {id}, ctx) =>{
  const authoredExpeditions = await Expedition.query().where('authorId', id);
  if(authoredExpeditions)
}
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
      
      const participatedExpeditions = await ParticipantExpedition.query()
        .select('expeditions.*')
        .join('expeditions', 'participantsExpeditions.expeditionId', 'expeditions.id')
        .where('userId', id);
      const expeditionInvitesSent = await ExpeditionInvite.query().where('from', id);
      const expeditionInvitesRecived = await ExpeditionInvite.query().where('to', id);
      if (user) {
        return {user, authoredExpeditions, participatedExpeditions, expeditionInvitesSent, expeditionInvitesRecived};
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
      const { id, ...atributes } = input;
      const user = await User.query().patchAndFetchById(id, atributes);
      return user;
    },
  },
};

module.exports = userResolvers;
