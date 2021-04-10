const Message = require('../../db/models/message');
const User = require('../../db/models/user');

const messageResolvers = {
  Message: {
    user: async (parent, args, ctx) => {
      return await parent.$relatedQuery('user');
    },
    chat: async (parent, args, ctx) => {
      return await parent.$relatedQuery('chat');
    },
  },
  Query: {
    messages: async (parent, { chatId }, ctx) => {
      const messages = await Message.query().where('chatId', '=', chatId);
      if (messages) {
        return messages;
      } else {
        throw new Error('Messages not found');
      }
    },
  },
  Mutation: {
    sendMessage: async (parent, { chatId, userId, message }, ctx) => {
      const messageObject = await Message.query()
        .insert({
          userId: userId,
          chatId: chatId,
          content: message,
        })
        .returning('*');
      return messageObject;
    },
  },
};

module.exports = messageResolvers;
