const Message = require('../../db/models/message');

const messageResolvers = {
  Query: {
    messages: async (parent, { chatUuid }, ctx) => {
      const messages = await Message.query().where('chatUuid', '=', chatUuid);
      if (messages) {
        return messages;
      } else {
        throw new Error('Messages not found');
      }
    },
  },
};

module.exports = messageResolvers;
