const Reaction = require('../../db/models/reaction');
const Message = require('../../db/models/message');

const reactionResolvers = {
  ReactionType: {
    LIKE: 'LIKE',
    DISLIKE: 'DISLIKE',
    PLUSONE: 'PLUSONE',
    HEART: 'HEART',
    CHILL: 'CHILL',
    ANGRY: 'ANGRY',
    SADFACE: 'SADFACE',
    POOP: 'POOP',
    WOW: 'WOW',
  },
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
      const messageObject = await Message.query()
        .findOne({
          id: messageId,
        })
        .returning('*');
      const removedReaction = await Reaction.query()
        .findOne({
          messageId: messageId,
          userId: userId,
        })
        .returning('*');
      if (removedReaction != null) {
        pubsub.publish(messageObject.chatId + '_reactionRemoved', {
          reactionRemoved: removedReaction,
        });
        await removedReaction.$query().delete();
      }

      const reactionObject = await Reaction.query()
        .insert({
          messageId: messageId,
          userId: userId,
          type: reactionType,
        })
        .returning();

      pubsub.publish(messageObject.chatId + '_reactionAdded', {
        reactionAdded: reactionObject,
      });
      return reactionObject;
    },

    removeReaction: async (parent, { messageId }, { pubsub, userId }) => {
      const messageObject = await Message.query()
        .findOne({
          id: messageId,
        })
        .returning('*');
      const removedReaction = await Reaction.query()
        .findOne({
          messageId: messageId,
          userId: userId,
        })
        .returning('*');
      await removedReaction.$query().delete();
      pubsub.publish(messageObject.chatId + '_reactionRemoved', {
        reactionRemoved: removedReaction,
      });
      return reactionObject;
    },
  },
  Subscription: {
    reactionAdded: {
      subscribe: (parent, { chatId }, { pubsub }) => {
        return pubsub.asyncIterator(chatId + '_reactionAdded');
      },
    },
    reactionRemoved: {
      subscribe: (parent, { chatId }, { pubsub }) => {
        return pubsub.asyncIterator(chatId + '_reactionRemoved');
      },
    },
  },
};

module.exports = reactionResolvers;
