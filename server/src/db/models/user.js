const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Expedition = require('./expedition');
    const ExpeditionInvite = require('./expeditionInvite');
    const Chat = require('./chat');
    const ExpeditionLocation = require('./expeditionLocation');
    const ExpeditionPhoto = require('./expeditionPhoto');

    return {
      authoredExpeditions: {
        relation: Model.HasManyRelation,
        modelClass: Expedition,
        join: {
          from: 'users.id',
          to: 'expeditions.authorId',
        },
      },
      participatedExpeditions: {
        relation: Model.ManyToManyRelation,
        modelClass: Expedition,
        join: {
          from: 'users.id',
          through: {
            from: 'participantsExpeditions.userId',
            to: 'participantsExpeditions.expeditionId',
          },
          to: 'expeditions.id',
        },
      },
      sentExpeditionInvites: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionInvite,
        join: {
          from: 'users.id',
          to: 'expeditionInvites.fromId',
        },
      },
      receivedExpeditionInvites: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionInvite,
        join: {
          from: 'users.id',
          to: 'expeditionInvites.toId',
        },
      },
      chats: {
        relation: Model.ManyToManyRelation,
        modelClass: Chat,
        join: {
          from: 'users.id',
          through: {
            from: 'userChats.userId',
            to: 'userChats.chatId',
          },
          to: 'chats.id',
        },
      },
      expeditionLocations: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionLocation,
        join: {
          from: 'users.id',
          to: 'expeditionLocations.userId',
        },
      },
      expeditionPhotos: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionPhoto,
        join: {
          from: 'users.id',
          to: 'expeditionPhotos.userId',
        },
      },
    };
  }
}

module.exports = User;
