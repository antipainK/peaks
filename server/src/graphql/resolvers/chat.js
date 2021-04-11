const Chat = require('../../db/models/chat');
const User = require('../../db/models/user');
const UserChat = require('../../db/models/userChat');
const Message = require('../../db/models/message');

const chatResolvers = {
  Chat: {
    messages: async (parent, args, ctx) => {
      const messages = await Message.query().where('chatId', '=', parent.id);
      if (messages) {
        return messages;
      } else {
        throw new Error('Messages not found');
      }
    }
  },
  Mutation: {
    createChat: async (parent, { userAId, userBId }, ctx) => {
      const userA = await User.query().findOne({ id: userAId });
      const userB = await User.query().findOne({ id: userBId });
      if (userA && userB) {
        const chat = await Chat.query().insert({
          name: userA.displayName + ' - ' + userB.displayName,
        });
        await UserChat.query()
          .insert({
            userId: userAId,
            chatId: chat.id,
          })
          .returning('*');
        await UserChat.query()
          .insert({
            userId: userBId,
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
