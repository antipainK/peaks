const { Model } = require('objection');

class Chat extends Model {
  static get tableName() {
    return 'chats';
  }

  static get relationMappings() {
    const User = require('./user');

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'chats.id',
          through: {
            from: 'userChats.chatId',
            to: 'userChats.userId',
          },
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Chat;
