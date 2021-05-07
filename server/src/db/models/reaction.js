const { Model } = require('objection');

class Reaction extends Model {
  static get tableName() {
    return 'reactions';
  }

  static get relationMappings() {
    const User = require('./user');
    const Message = require('./message');

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
        modelClass: Message,
        join: {
          from: 'reactions.messageId',
          to: 'messages.id',
        },
      },
    };
  }
}

module.exports = Reaction;
