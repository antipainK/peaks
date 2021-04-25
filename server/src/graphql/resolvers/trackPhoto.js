const { AuthenticationError } = require('apollo-server-errors');
const Track = require('../../db/models/track');
const TrackPhoto = require('../../db/models/trackPhoto');

const trackPhotoResolvers = {
  TrackPhoto: {
    track: async (parent, args, ctx) => {
      return await parent.$relatedQuery('track');
    },
  },

  Mutation: {
    addTrackPhoto: async (parent, { input }, ctx) => {
      if (!ctx.userId) throw new AuthenticationError('Not authenticated');

      const track = await Track.query().findById(input.trackId);

      if (!track) {
        return new Error('Track not found');
      }

      if (track.userId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      return await TrackPhoto.query().insert(input).returning('*');
    },

    deleteTrackPhoto: async (parent, { id }, ctx) => {
      const track = await Track.query().findById(id);

      if (!track) {
        return new Error('Track not found');
      }

      if (track.userId !== ctx.userId) {
        throw new AuthenticationError('Not authorized');
      }

      return await TrackPhoto.query().deleteById(id).returning('*');
    },
  },
};

module.exports = trackPhotoResolvers;
