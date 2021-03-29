const Peak = require('../../db/models/peak');

const peakResolvers = {
  Query: {
    peak: async (parent, { id }, ctx) => {
      const peak =  await Peak.query().findById(id);
      if( peak === null){
        throw new Error("Peak not found");
      }else{
        return peak;
      }
    },
  },
};

module.exports = peakResolvers;
