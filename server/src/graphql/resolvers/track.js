const { AuthenticationError } = require('apollo-server-errors');
const Track = require('../../db/models/track');

const trackResolvers = {
  Track: {
    started: async (parent, args, ctx) => {
      return parent.startedAt !== null && parent.stoppedAt === null;
    },

    user: async (parent, args, ctx) => {
      return await parent.$relatedQuery('user');
    },

    locations: async (parent, args, ctx) => {
      return await parent.$relatedQuery('locations').orderBy('timestamp');
    },

    photos: async (parent, args, ctx) => {
      return await parent.$relatedQuery('photos');
    },
  },

  Mutation: {
    startTrack: async (parent, { id }, ctx) => {
      if (!ctx.userId) throw new AuthenticationError('Not authenticated');

      const track = await Track.query().findById(id);

      if (!track) {
        return new Error('Track not found');
      }

      if (track.userId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      if (track.startedAt === null) {
        return await track.$query().patch({ startedAt: new Date() }).returning('*');
      } else if (track.stoppedAt) {
        return await track.$query().patch({ stoppedAt: null }).returning('*');
      } else {
        throw new Error('Track already started');
      }
    },

    stopTrack: async (parent, { id }, ctx) => {
      if (!ctx.userId) throw new AuthenticationError('Not authenticated');

      const track = await Track.query().findById(id);

      if (!track) {
        return new Error('Track not found');
      }

      if (track.userId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      if (track.stoppedAt === null) {
        return await track.$query().patch({ stoppedAt: new Date() }).returning('*');
      } else {
        throw new Error('Track already stopped');
      }
    },
  },
};

module.exports = trackResolvers;
