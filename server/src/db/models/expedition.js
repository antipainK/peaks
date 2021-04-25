const { Model } = require('objection');

class Expedition extends Model {
  static get tableName() {
    return 'expeditions';
  }

  static get relationMappings() {
    const User = require('./user');
    const Peak = require('./peak');
    const ExpeditionLocation = require('./expeditionLocation');
    const ExpeditionPhoto = require('./expeditionPhoto');

    return {
      expeditionLocations: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionLocation,
        join: {
          from: 'expeditions.id',
          to: 'expeditionLocations.expeditionId',
        },
      },
      expeditionPhotos: {
        relation: Model.HasManyRelation,
        modelClass: ExpeditionPhoto,
        join: {
          from: 'expeditions.id',
          to: 'expeditionPhotos.expeditionId',
        },
      },
      participants: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'expeditions.id',
          through: {
            from: 'participantsExpeditions.expeditionId',
            to: 'participantsExpeditions.userId',
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
    };
  }
}

module.exports = Expedition;
