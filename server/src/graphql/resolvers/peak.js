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
    peak: async (parent, { id }) => {
      const peak = await Peak.query().findById(id);

      if (peak) {
        return { peak, expeditions };
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
