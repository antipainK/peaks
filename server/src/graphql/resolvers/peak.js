const Peak = require('../../db/models/peak');
const Expedition = require('../../db/models/expedition');
const UserAchievemt = require('../../db/models/userAchievement');

const peakResolvers = {
  Peak: {
    expeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('expeditions').orderBy('date', 'desc');
    },
    peopleFinished: async (parent, { id }, ctx) => {
      return await Expedition.query()
        .join('tracks', 'expeditions.id', 'tracks.expeditionId')
        .where('stoppedAt', '<', new Date())
        .where('peakId', id)
        .select('userId')
        .distinct();
    },
    peopleFinishedCount: async (parent, { id }, ctx) => {
      return await Expedition.query()
        .join('tracks', 'expeditions.id', 'tracks.expeditionId')
        .where('stoppedAt', '<', new Date())
        .where('peakId', id)
        .countDistinct('userId');
    },
    peopleReached: async (parent, { id }, ctx) => {
      return await UserAchievemt.query()
        .join('achievemets', 'userAchievements.achievemetId', 'achievements.id')
        .where({ metaId: id, TYPE: 'PEAK' });
    },
    peopleReachedCount: async (parent, { id }, ctx) => {},
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
