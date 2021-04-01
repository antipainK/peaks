const Peak = require('../../db/models/peak');

const peakResolvers = {
  Query: {
    peak: async (parent, { id }) => {
      const peak = await Peak.query().findById(id);

      if (peak) {
        return peak;
      } else {
        throw new Error('Peak not found');
      }
    },
  },
};

module.exports = peakResolvers;
