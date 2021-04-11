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
  Query: {},
  Mutation: {
    sendMessage: async (parent, { chatId, userId, message }, { pubsub }) => {
      const messageObject = await Message.query()
        .insert({
          userId: userId,
          chatId: chatId,
          content: message,
        })
        .returning('*');

      pubsub.publish(chatId + '_chat', { messageSent: messageObject });
      return messageObject;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (parent, { chatId }, { pubsub }) => {
        //TODO - można sprawdzić z ctx, czy userId należy do chatu, który chcesz nasłuchiwać
        return pubsub.asyncIterator(chatId + '_chat');
      },
    },
  },
};

module.exports = messageResolvers;
