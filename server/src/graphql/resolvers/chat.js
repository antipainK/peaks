const Chat = require('../../db/models/chat');
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
    },
  },
};

module.exports = chatResolvers;
