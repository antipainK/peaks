const { AuthenticationError } = require('apollo-server-errors');
const User = require('../../db/models/user');

const userResolvers = {
  Query: {
    me: async (parent, args, { userId }) => {
      if (!userId) return null;

      return await User.query().findById(userId);
    },

    user: async (parent, { id }) => {
      const user = await User.query().findById(id);

      if (user) {
        return user;
      } else {
        throw new Error('User not found');
      }
    },

    users: async (parent, args, ctx) => {
      const users = await User.query();
      return users;
    },
  },

  Mutation: {
    updateMe: async (parent, { input }, { userId }) => {
      if (!userId) throw new AuthenticationError('not authenticated');
      const updatedUser = await User.query().patchAndFetchById(userId, input);

      return updatedUser;
    },
  },
};

module.exports = userResolvers;
