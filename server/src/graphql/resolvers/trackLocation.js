const { AuthenticationError } = require('apollo-server-errors');
const Track = require('../../db/models/track');
const Peak = require('../../db/models/peak');
const TrackLocation = require('../../db/models/trackLocation');
const PeakAchivement = require('../../db/models/userPeakAchivement');

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

      const trackLocation = await TrackLocation.query().insert(input).returning('*');

      const peakID, longitude, latitude = await Peak.query().select('peaks.id', 'peaks.longitude', 'peaks.latitude')
      .join('expeditions', 'peaks.id', 'expeditions.peakId')
      .join('tracks', 'tracks.expeditionId', 'expeditions.id')
      .where('tracks.id', input.trackId);

      if(Math.abs(input.latitude-latitude)<0.001 && Math.abs(input.longitude-longitude)<0.001){
        const achivement = await PeakAchivement.query().where({
          userId: ctx.userId,
          peakId: peakID,
        });
        if(!achivement){
          await PeakAchivement.query().insert({
            userId: ctx.userId,
            peakId: peakID, 
          });
        }
      }

      return trackLocation;
    },
  },
};

module.exports = trackLocationResolvers;
