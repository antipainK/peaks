const Expedition = require('../../db/models/expedition');
const Peak = require('../../db/models/peak');

const peakResolvers = {
  Peak: {
    expeditions: async (parent, { id }, ctx) => {
      const expeditions = Expedition.query().where('peak', peak);
      if (expeditions) {
        return expeditions;
      } else {
        throw new Error('No expeditions found');
      }
    },
  },
  Query: {
    peak: async (parent, { id }, ctx) => {
      const peak = await Peak.query().findById(id);
      if (peak) {
        return { peak, expeditions };
      } else {
        throw new Error('Peak not found');
      }
    },
  },
};

module.exports = peakResolvers;
