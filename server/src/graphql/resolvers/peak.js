const Peak = require('../../db/models/peak');

const peakResolvers = {
  Query: {
    peak: async (parent, { id }, { peak }) => {
      return peak.findPeakById(id);
    },
  },
};

module.exports = peakResolvers;
