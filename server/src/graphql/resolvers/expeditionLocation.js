const ExpeditionLocation = require('../../db/models/expeditionLocation');

const expeditionLocationResolvers = {
  Mutation: {
    addUserLoaction: async (parent, { input }) => {
      const expeditionLocation = await ExpeditionLocation.query().insert(input);
      return expeditionLocation;
    },
  },
};

module.exports = expeditionLocationResolvers;
