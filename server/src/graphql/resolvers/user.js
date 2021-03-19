const User = require('../../db/models/user');

const userResolvers = {
  Query: {
    me: (parent, args, ctx) => {
      return { email: 'test@example.com', displayName: 'marian' };
    },
    users: async (parent, args, ctx) => {
      const users = await User.query();
      return users;
    },
  },
};

module.exports = userResolvers;
