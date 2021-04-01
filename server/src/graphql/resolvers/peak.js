const Peak = require('../../db/models/peak');

const peakResolvers = {
  Query: {
    peak: async (parent, { id }, ctx) => {
      const peak = await Peak.query().findById(id);
      if (peak) {
        return peak;
      } else {
        throw new Error('Peak not found');
      }
    },
    peaks: async (parent, args, ctx) => {
      return await Peak.query();
    },
  },
};

module.exports = peakResolvers;
