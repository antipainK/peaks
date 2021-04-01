const User = require('../../db/models/user');

const userResolvers = {
  Query: {
    me: (parent, args, ctx) => {
      // TODO: auth
      return {
        id: 0,
        email: 'test@example.com',
        displayName: 'marian',
        city: 'Radom',
        contact: '',
      };
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
    updateUser: async (parent, { input }, ctx) => {
      // TODO: auth
      const { id, ...atributes } = input;
      const user = await User.query().patchAndFetchById(id, atributes);

      return user;
    },
  },
};

module.exports = userResolvers;
