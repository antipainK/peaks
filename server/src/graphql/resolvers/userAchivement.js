const UserAchivement = require('../../db/models/userAchivement');

const userAchivementResolvers = {
  UserAchivement: {
    achivement: async (parent, args, ctx) => {
      return await parent.$relatedquery('achivement');
    },
  },
};

module.exports = userAchivementResolvers;
