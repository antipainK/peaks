const { Model } = require('objection');

class Chat extends Model {
  static get tableName() {
    return 'chats';
  }
}

module.exports = Chat;
