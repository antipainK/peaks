const { AuthenticationError } = require('apollo-server-errors');
const User = require('../../db/models/user');
const Chat = require('../../db/models/chat');
const UserChat = require('../../db/models/userChat');

const userResolvers = {
  User: {
    authoredExpeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('authoredExpeditions');
    },

    participatedExpeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('participatedExpeditions');
    },

    sentExpeditionInvites: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('sentExpeditionInvites');
    },

    receivedExpeditionInvites: async (parent, { id }, ctx) => {
      return await parent
        .$relatedQuery('receivedExpeditionInvites')
        .orderBy('timestamp', 'desc');
    },

    chats: async (parent, args, ctx) => {
      const chatList = await Chat.query().whereIn(
        'id',
        UserChat.query().select('chatId').where('userId', '=', parent.id)
      );
      return chatList;
    },
    expeditionRoutes: async (parent, args, ctx) => {
      return await parent.$relatedQuery('expeditionRoutes');
    },
  },

  Query: {
    me: async (parent, args, { userId }) => {
      if (!userId) return null;

      return await User.query().findById(userId);
    },

    user: async (parent, { id }) => {
      const user = await User.query().findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },

    users: async (parent, args, ctx) => {
      return await User.query();
    },
  },

  Mutation: {
    updateMe: async (parent, { input }, { userId }) => {
      if (!userId) throw new AuthenticationError('Not authenticated');

      const updatedUser = await User.query()
        .findById(userId)
        .patch(input)
        .returning('*');

      return updatedUser;
    },
  },
};

module.exports = userResolvers;
