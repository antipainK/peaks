const { Model } = require('objection');

class Reaction extends Model {
  static get tableName() {
    return 'reactions';
  }

  static get relationMappings() {
    const User = require('./user');
    const Chat = require('./chat');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'reactions.userId',
          to: 'users.id',
        },
      },
      message: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: 'reactions.messageId',
          to: 'chats.id',
        },
      },
    };
  }
}

module.exports = Reaction;
