const { AuthenticationError } = require('apollo-server-errors');
const Track = require('../../db/models/track');
const TrackLocation = require('../../db/models/trackLocation');

const trackLocationResolvers = {
  TrackLocation: {
    track: async (parent, args, ctx) => {
      return await parent.$relatedQuery('track');
    },
  },

  Mutation: {
    addTrackLocation: async (parent, { input }, ctx) => {
      if (!ctx.userId) throw new AuthenticationError('Not authenticated');

      const track = await Track.query().findById(input.trackId);

      if (!track) {
        return new Error('Track not found');
      }

      if (track.userId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      return await TrackLocation.query().insert(input).returning('*');
    },
  },
};

module.exports = trackLocationResolvers;
