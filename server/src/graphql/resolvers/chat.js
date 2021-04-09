const Chat = require('../../db/models/chat');
const Message = require('../../db/models/message');
const UserChat = require('../../db/models/userChat');

const chatResolvers = {
  Query: {
    chats: async (parent, { userUuid }, ctx) => {
      const chatList = await Chat.query().whereExists(
        UserChat.query()
          .where('userUuid', '=', userUuid)
          .whereColumn('userChats.userUuid', 'chats.uuid')
      );
      if (chatList) {
        return chatList;
      } else {
        throw new Error('Chats not found');
      }
    } /*,
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
    },*/,
  } /*,
  Mutation: {
    updateUser: async (parent, { input }, ctx) => {
      const { id, ...atributes } = input;
      const user = await User.query().patchAndFetchById(id, atributes);
      return user;
    },
  },*/,
};

module.exports = chatResolvers;
