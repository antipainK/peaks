const Chat = require('../../db/models/chat');
const User = require('../../db/models/user');
const Message = require('../../db/models/message');

const chatResolvers = {
  Chat: {
    messages: async (parent, { dateFrom, dateTo }, ctx) => {
      const messagesQuery = Message.query().where('chatId', '=', parent.id);
      if (dateFrom) messagesQuery.where('time', '>', dateFrom);
      if (dateTo) messagesQuery.where('time', '<', dateTo);
      const messages = await messagesQuery;
      return messages;
    },

    users: async (parent, args, ctx) => {
      return parent.$relatedQuery('users');
    },
  },

  Query: {
    chat: async (parent, { chatId }, ctx) => {
      const chatObject = await Chat.query().findOne({ id: chatId });
      return chatObject;
    },
  },

  Mutation: {
    createChat: async (parent, { otherUserId }, { userId }) => {
      const userA = await User.query().findById(userId);
      const userB = await User.query().findById(otherUserId);

      if (!userA || !userB) {
        throw new Error('Users not found.');
      }

      const chatName = userA.displayName + ' - ' + userB.displayName;

      const chat = await Chat.query()
        .insertGraph(
          {
            name: chatName,
            users: [userA, userB],
          },
          { relate: true }
        )
        .returning('*');

      return chat;
    },

    changeChatName: async (parent, { chatId, name }, ctx) => {
      const chat = await Chat.query()
        .patch({ name: name })
        .where('id', '=', chatId)
        .returning('*');
      return chat;
    },
  },
};

module.exports = chatResolvers;
