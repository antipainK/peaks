const userResolvers = {
  Query: {
    me: (parent, args, ctx) => {
      return { email: 'test@example.com', displayName: 'marian' };
    },
  },
};

module.exports = userResolvers;
