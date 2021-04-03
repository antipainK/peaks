const Expedition = require('../../db/models/expedition');
const Peak = require('../../db/models/peak');

const peakResolvers = {
  Query: {
    peak: async (parent, { id }, ctx) => {
      const peak = await Peak.query().findById(id);
      const expeditions = await Expedition.query().where('peakId', id);
      if (peak) {
        return {peak, expeditions};
      } else {
        throw new Error('Peak not found');
      }
    },
  },
};

module.exports = peakResolvers;
