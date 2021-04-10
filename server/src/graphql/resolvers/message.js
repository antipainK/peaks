const Message = require('../../db/models/message');

const messageResolvers = {
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
};

module.exports = messageResolvers;
