const Reaction = require('../../db/models/reaction');

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
      const removedReaction = await Reaction.query()
        .findOne({
          messageId: messageId,
          userId: userId,
        })
        .returning('*');
      if (removedReaction != null) {
        pubsub.publish(messageId + '_reactionRemoved', {
          reactionRemoved: removedReaction,
        });
        await Reaction.query().delete().findOne({
          id: removedReaction.id,
        });
      }

      const reactionObject = await Reaction.query()
        .insert({
          messageId: messageId,
          userId: userId,
          type: reactionType,
        })
        .returning();

      pubsub.publish(messageId + '_reactionAdded', {
        reactionAdded: reactionObject,
      });
      return reactionObject;
    },

    removeReaction: async (parent, { messageId }, { pubsub, userId }) => {
      const removedReaction = await Reaction.query()
        .findOne({
          messageId: messageId,
          userId: userId,
        })
        .returning('*');
      await Reaction.query().delete().findOne({
        id: removedReaction.id,
      });
      pubsub.publish(messageId + '_reactionRemoved', {
        reactionRemoved: removedReaction,
      });
      return reactionObject;
    },
  },
  Subscription: {
    reactionAdded: {
      subscribe: (parent, { messageId }, { pubsub }) => {
        return pubsub.asyncIterator(messageId + '_reactionAdded');
      },
    },
    reactionRemoved: {
      subscribe: (parent, { messageId }, { pubsub }) => {
        return pubsub.asyncIterator(messageId + '_reactionRemoved');
      },
    },
  },
};

module.exports = reactionResolvers;
