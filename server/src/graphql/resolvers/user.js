const { AuthenticationError } = require('apollo-server-errors');
const User = require('../../db/models/user');
const Peak = require('../../db/models/peak');
const Track = require('../../db/models/track');
const Expedition = require('../../db/models/expedition');

const userResolvers = {
  User: {
    authoredExpeditions: async (parent, args, ctx) => {
      return await parent.$relatedQuery('authoredExpeditions');
    },

    participatedExpeditions: async (parent, args, ctx) => {
      return await parent.$relatedQuery('participatedExpeditions');
    },

    sentExpeditionInvites: async (parent, args, ctx) => {
      return await parent.$relatedQuery('sentExpeditionInvites');
    },

    receivedExpeditionInvites: async (parent, { id }, ctx) => {
      return await parent
        .$relatedQuery('receivedExpeditionInvites')
        .orderBy('timestamp', 'desc');
    },

    chats: async (parent, args, ctx) => {
      return await parent.$relatedQuery('chats');
    },

    tracks: async (parent, args, ctx) => {
      return await parent.$relatedQuery('tracks');
    },

    statistics: async (parent, args, ctx) => {
      let stats = [];
      

      // "Użytkownik uzyskał 4 z 28 szczytów"

      const peaksCount = await Peak.query().count();

      /*
      const userTracks = await Track.query().where('userId', '=', parent.id);
      console.log(userTracks)
      */

      /*
      const userExpeditions = await Expedition.query().whereExists(Track.query().where('userId', '=', parent.id))
      console.log(userExpeditions)
      */

      /*
      const userPeaks = await Expedition.query().whereExists(Track.query().where('userId', '=', parent.id)).select('peakId')
      console.log(userPeaks)
      */

      /*
      const userPeaksDistinct = await Expedition.query().distinctOn('peakId').select('peakId').whereExists(Track.query().where('userId', '=', parent.id))
      console.log(userPeaksDistinct)
      */
      
      const userPeaksDistinctCount = await Expedition.query()./*distinctOn('peakId').select('peakId').*/whereExists(Track.query().where('userId', '=', parent.id)).countDistinct('peakId')
      let result1 = "Achieved peaks: " + String(userPeaksDistinctCount[0].count) + " out of " + String(peaksCount[0].count)






      return [result1];
    },
  },

  Query: {
    me: async (parent, args, { userId }) => {
      if (!userId) return null;

      return await User.query().findById(userId);
    },

    user: async (parent, { id }) => {
      const user = await User.query().findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },

    users: async (parent, args, ctx) => {
      return await User.query();
    },
  },

  Mutation: {
    updateMe: async (parent, { input }, { userId }) => {
      if (!userId) throw new AuthenticationError('Not authenticated');

      const updatedUser = await User.query()
        .findById(userId)
        .patch(input)
        .returning('*');

      return updatedUser;
    },
  },
};

module.exports = userResolvers;
