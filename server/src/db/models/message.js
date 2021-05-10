const { Model } = require('objection');
const User = require('./user');
const Reaction = require('./reaction');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }

  static get relationMappings() {
    const User = require('./user');
    const Chat = require('./chat');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.userId',
          to: 'users.id',
        },
      },
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: 'messages.chatId',
          to: 'chats.id',
        },
      },
      reactions: {
        relation: Model.HasManyRelation,
        modelClass: Reaction,
        join: {
          from: 'messages.id',
          to: 'reactions.messageId',
        },
      },
    };
  }
}

module.exports = Message;
