const Expedition = require('../../db/models/expedition');
const Peak = require('../../db/models/peak');

const peakResolvers = {
  Peak: {
    expeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('expeditions');
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
      return await Peak.query();
    },
  },
};

module.exports = peakResolvers;
