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

      const peakID, longitude, latitude = await Peak.query().select('peaks.id', 'peaks.longitude', 'peaks.latitude')
      .join('expeditions', 'peaks.id', 'expeditions.peakId')
      .join('tracks', 'tracks.expeditionId', 'expeditions.id')
      .where('tracks.id', input.trackId);

      const achivementId = await Achivement.query().select('id').where('peakId', peakID);

      if(Math.abs(input.latitude-latitude)<0.001 && Math.abs(input.longitude-longitude)<0.001){
        const achivement = await UserAchivement.query().where({
          userId: ctx.userId,
          achivementId: achivementId,
        });
        if(!achivement){
          await UserAchivement.query().insert({
            userId: ctx.userId,
            achivementId: achivementId, 
          });
        }
      }

      return await TrackLocation.query().insert(input).returning('*');
    },
  },
};

module.exports = trackLocationResolvers;
