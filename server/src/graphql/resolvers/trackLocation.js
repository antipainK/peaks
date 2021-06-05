const { AuthenticationError } = require('apollo-server-errors');
const Track = require('../../db/models/track');
const Peak = require('../../db/models/peak');
const TrackLocation = require('../../db/models/trackLocation');
const UserAchievement = require('../../db/models/userAchievement');
const Achievement = require('../../db/models/achievement');

const MIN_DIST_FROM_PEAK = 0.01;

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

      const trackLocation = await TrackLocation.query()
        .insert(input)
        .returning('*');

      const peak = await Peak.query()
        .select('peaks.id', 'peaks.longitude', 'peaks.latitude')
        .join('expeditions', 'peaks.id', 'expeditions.peakId')
        .join('tracks', 'tracks.expeditionId', 'expeditions.id')
        .where('tracks.id', input.trackId)
        .first();

      const achievementId = await Achievement.query()
        .select('id')
        .where({ metaId: peak[0].id, type: Achievement.Types.PEAK });

      if (
        distanceKm(
          input.latitude,
          input.longitude,
          peak[0].latitude,
          peak[0].longitude
        ) < MIN_DIST_FROM_PEAK
      ) {
        const achievement = await UserAchievement.query().where({
          userId: ctx.userId,
          achievementId: achievementId,
        });
        if (!achievement) {
          await UserAchievement.query().insert({
            userId: ctx.userId,
            achievementId: achievementId,
          });
        }
      }

      return trackLocation;
    },
  },
};

module.exports = trackLocationResolvers;
