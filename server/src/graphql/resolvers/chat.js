const Chat = require('../../db/models/chat');
const User = require('../../db/models/user');
const UserChat = require('../../db/models/userChat');
const Message = require('../../db/models/message');

const chatResolvers = {
  Chat: {
    messages: async (parent, { dateFrom, dateTo }, ctx) => {
      const messagesQuery = Message.query().where('chatId', '=', parent.id);
      if (dateFrom) messagesQuery.where('time', '>', dateFrom);
      if (dateTo) messagesQuery.where('time', '<', dateTo);
      const messages = await messagesQuery;
      return messages;
    },
  },
  Mutation: {
    createChat: async (parent, { otherUserId }, { userId }) => {
      const userA = await User.query().findOne({ id: userId });
      const userB = await User.query().findOne({ id: otherUserId });
      if (userA && userB) {
        const chat = await Chat.query().insert({
          name: userA.displayName + ' - ' + userB.displayName,
        });
        await UserChat.query()
          .insert({
            userId: userId,
            chatId: chat.id,
          })
          .returning('*');
        await UserChat.query()
          .insert({
            userId: otherUserId,
            chatId: chat.id,
          })
          .returning('*');
        return chat;
      }
      throw new Error('Users not found.');
    },
    changeChatName: async (parent, { chatId, name }, ctx) => {
      const chat = await Chat.query()
        .patch({ name: name })
        .where('id', '=', chatId)
        .returning('*');
      return chat;
    },
  },
};

module.exports = chatResolvers;
