const User = require('../../db/models/user');
const Chat = require('../../db/models/chat');
const UserChat = require('../../db/models/userChat');

const userResolvers = {
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
    chats: async (parent, args, ctx) => {
      const chatList = await Chat.query().whereExists(
        UserChat.query()
          .where('userId', '=', parent.id)
          .whereColumn('userChats.chatId', 'chats.id')
      );
      return chatList;
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
