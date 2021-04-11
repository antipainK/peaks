const { Model } = require('objection');

class UserChat extends Model {
  static get tableName() {
    return 'userChats';
  }
}

module.exports = UserChat;
