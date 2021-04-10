const { Model } = require('objection');
const User = require('./user');

class Message extends Model {
  static get tableName() {
    return 'messages';
  }

  static get relationMappings(){
    const User = require('./user');
    const Chat = require('./chat');
    
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.userId',
          to: 'users.id',
        }
      },
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: 'messages.chatId',
          to: 'chats.id',
        }
      }
    }
  }
}

module.exports = Message;
