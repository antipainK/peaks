const Peak = require('../../db/models/peak');
const Expedition = require('../../db/models/expedition');
const UserAchievement = require('../../db/models/userAchievement');

const peakResolvers = {
  Peak: {
    expeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('expeditions').orderBy('date', 'desc');
    },
    peopleFinishedExpedition: async (parent, { id }, ctx) => {
      return await Expedition.query()
        .join('tracks', 'expeditions.id', 'tracks.expeditionId')
        .where('stoppedAt', '<', new Date())
        .where('peakId', id)
        .select('userId')
        .distinct();
    },
    peopleFinishedExpeditionCount: async (parent, { id }, ctx) => {
      return await Expedition.query()
        .join('tracks', 'expeditions.id', 'tracks.expeditionId')
        .where('stoppedAt', '<', new Date())
        .where('peakId', id)
        .countDistinct('userId');
    },
    peopleReachedPeak: async (parent, { id }, ctx) => {
      return await UserAchievement.query()
        .join(
          'achievements',
          'userAchievements.achievementId',
          'achievements.id'
        )
        .where({ metaId: id, TYPE: 'PEAK' })
        .select('userId')
        .distinct();
    },
    peopleReachedPeakCount: async (parent, { id }, ctx) => {
      return await UserAchievement.query()
        .join(
          'achievements',
          'userAchievements.achievementId',
          'achievements.id'
        )
        .where({ metaId: id, TYPE: 'PEAK' })
        .countDistinct('userId');
    },
    expeditionsCount: async (parent, { id }, ctx) => {
      return await parent
        .$relatedQuery('expeditions')
        .countDistinct('expeditions.id');
    },
  },
  Query: {
    peak: async (parent, { id }, ctx) => {
      const peak = await Peak.query().findById(id);

      if (!peak) {
        throw new Error('Peak not found');
      }

      return peak;
    },

    peaks: async (parent, args, ctx) => {
      return await Peak.query().orderBy('name');
    },
  },
};

module.exports = peakResolvers;
