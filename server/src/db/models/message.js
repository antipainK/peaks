const { Model } = require('objection');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }
}

module.exports = Message;
