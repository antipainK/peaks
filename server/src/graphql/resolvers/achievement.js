const Achievement = require('../../db/models/achievement');

const achievementResolvers = {
  Query: {
    achievements: async (parent, args, ctx) => {
      return await Achievement.query();
    },
  },
};

module.exports = achievementResolvers;
