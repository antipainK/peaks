const { AuthenticationError } = require('apollo-server-errors');
const User = require('../../db/models/user');

const userResolvers = {
  User: {
    authoredExpeditions: async (parent, args, ctx) => {
      return await parent.$relatedQuery('authoredExpeditions');
    },

    participatedExpeditions: async (parent, args, ctx) => {
      return await parent.$relatedQuery('participatedExpeditions');
    },

    sentExpeditionInvites: async (parent, args, ctx) => {
      return await parent.$relatedQuery('sentExpeditionInvites');
    },

    receivedExpeditionInvites: async (parent, { id }, ctx) => {
      return await parent
        .$relatedQuery('receivedExpeditionInvites')
        .orderBy('timestamp', 'desc');
    },

    chats: async (parent, args, ctx) => {
      return await parent.$relatedQuery('chats');
    },

    tracks: async (parent, args, ctx) => {
      return await parent.$relatedQuery('tracks');
    },

    achievements: async (parent, args, ctx) => {
      return await parent.$relatedQuery('achievements');
    },

    followers: async (parent, args, ctx) => {
      return await parent.$relatedQuery('followers');
    },

    following: async (parent, args, ctx) => {
      return await parent.$relatedQuery('following');
    },
  },

  Query: {
    me: async (parent, args, { userId }) => {
      if (!userId) return null;

      return await User.query().findById(userId);
    },

    user: async (parent, { id }) => {
      const user = await User.query().findById(id);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    },

    users: async (parent, args, ctx) => {
      return await User.query();
    },
  },

  Mutation: {
    updateMe: async (parent, { input }, { userId }) => {
      if (!userId) throw new AuthenticationError('Not authenticated');

      const updatedUser = await User.query()
        .findById(userId)
        .patch(input)
        .returning('*');

      return updatedUser;
    },

    followUser: async (parent, { id }, { userId }) => {
      if (!userId) throw new AuthenticationError('Not authenticated');
      const user = await User.query()
        .findById(userId)
        .withGraphFetched('following');

      const userToFollow = await User.query().findById(id);

      if (!userToFollow) {
        return new Error('User not found');
      }

      const alreadyFollowing = user.following.find(
        (followedUser) => followedUser.id === id
      );

      if (alreadyFollowing) {
        return new Error('You are already following a user with this ID');
      }

      await user.$relatedQuery('following').relate(id);

      return userToFollow;
    },

    unfollowUser: async (parent, { id }, { userId }) => {
      if (!userId) throw new AuthenticationError('Not authenticated');
      const user = await User.query()
        .findById(userId)
        .withGraphFetched('following');

      const userToUnfollow = await user.following.find(
        (followedUser) => followedUser.id === id
      );

      if (!userToUnfollow) {
        return new Error('You are not following any user with this ID');
      }

      await user.$relatedQuery('following').unrelate().where('toId', id);

      return userToUnfollow;
    },
  },
};

module.exports = userResolvers;
