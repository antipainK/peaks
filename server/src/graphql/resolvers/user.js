const User = require('../../db/models/user');

const userResolvers = {
  Query: {
    me: (parent, args, ctx) => {
      return {
        id: 0,
        email: 'test@example.com',
        displayName: 'marian',
        city: 'Radom',
        contact: '',
      };
    },
    user: async (parent, { id }, ctx) => {
      const user = await User.query().findById(id);
      console.log(user);
      if(user === null){
        throw new Error("User not found");
      }else{
        return user;
      }
    },
    users: async (parent, args, ctx) => {
      const users = await User.query();
      return users;
    },
  },
  Mutation: {
    user: async (
      parent,
      { id, email, displayName, city, contact },
      ctx
    ) => {
      const user = await User.query().patchAndFetchById(id ,{
        email: email,
        displayName: displayName,
        city: city,
        contact: contact,
      });
      return user;
    },
  },
};

module.exports = [userResolvers];
