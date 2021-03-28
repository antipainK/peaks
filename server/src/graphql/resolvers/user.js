const User = require('../../db/models/user');

const userResolvers = {
  Query: {
    me: (parent, args, ctx) => {
      return { email: 'test@example.com', displayName: 'marian' };
    },
    user: async (parent, {id}, {user}) =>{
      return user.findUserById(id);
    },
    users: async (parent, args, ctx) => {
      const users = await User.query();
      return users;
    },
  },
};

const userModifiers ={
  Mutation:{
    user: async(parent, {id, email, displayName}, {user}) =>{
      return user.modifyUser(id, email,displayName);
    }
  }
};

module.exports = [userResolvers, userModifiers];
