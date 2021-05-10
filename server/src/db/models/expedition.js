const { Model } = require('objection');
const Chat = require('./chat');

class Expedition extends Model {
  static get tableName() {
    return 'expeditions';
  }

  static get relationMappings() {
    const User = require('./user');
    const Peak = require('./peak');
    const Track = require('./track');

    return {
      participants: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'expeditions.id',
          through: {
            from: 'tracks.expeditionId',
            to: 'tracks.userId',
          },
          to: 'users.id',
        },
      },
      peak: {
        relation: Model.BelongsToOneRelation,
        modelClass: Peak,
        join: {
          from: 'expeditions.peakId',
          to: 'peaks.id',
        },
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'expeditions.authorId',
          to: 'users.id',
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: Track,
        join: {
          from: 'expeditions.id',
          to: 'tracks.expeditionId',
        },
      },
      chat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Chat,
        join: {
          from: 'expeditions.chatId',
          to: 'chats.id',
        },
      },
    };
  }
}

module.exports = Expedition;
