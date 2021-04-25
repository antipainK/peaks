const Peak = require('../../db/models/peak');

const peakResolvers = {
  Peak: {
    expeditions: async (parent, { id }, ctx) => {
      return await parent.$relatedQuery('expeditions').orderBy('date', 'desc');
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
