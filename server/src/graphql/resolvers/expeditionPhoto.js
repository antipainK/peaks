const ExpeditionPhoto = require('../../db/models/expeditionPhoto');

const expeditionPhotoResolvers = {
  Mutation: {
    addExpeditionPhoto: async (parent, { input }) => {
      const expeditionPhoto = await ExpeditionPhoto.query().insert(input);
      return expeditionPhoto;
    },
    deleteExpeditionPhoto: async (parent, { id }, ctx) => {
      const expeditionPhoto = await ExpeditionPhoto.query().deleteById(id);
      return expeditionPhoto;
    },
  },
};

module.exports = expeditionPhotoResolvers;
