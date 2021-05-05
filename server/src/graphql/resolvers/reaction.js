const Reaction = require('../../db/models/reaction');

const reactionResolvers = {
  Reaction: {
    user: async (parent, args, ctx) => {
      return await parent.$relatedQuery('user');
    },
    message: async (parent, args, ctx) => {
      return await parent.$relatedQuery('message');
    },
  },
  Query: {},
  Mutation: {
    addReaction: async (
      parent,
      { messageId, reactionType },
      { pubsub, userId }
    ) => {
      await Reaction.query().delete().findOne({
        messageId: messageId,
        userId: userId,
      });
      const reactionObject = await Reaction.query().insert({
        messageId: messageId,
        userId: userId,
        type: reactionType,
      });

      pubsub.publish(messageId + '_message', { messageSent: reactionObject });
      return reactionObject;
    },
  },
  Subscription: {
    reactionChanged: {
      subscribe: (parent, { messageId }, { pubsub }) => {
        return pubsub.asyncIterator(messageId + '_message');
      },
    },
  },
};

module.exports = reactionResolvers;
