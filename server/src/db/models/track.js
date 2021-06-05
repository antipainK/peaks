const { Model } = require('objection');
const Expedition = require('./expedition');

class Track extends Model {
  static get tableName() {
    return 'tracks';
  }

  static get relationMappings() {
    const User = require('./user');
    const TrackLocation = require('./trackLocation');
    const TrackPhoto = require('./trackPhoto');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tracks.userId',
          to: 'users.id',
        },
      },
      locations: {
        relation: Model.HasManyRelation,
        modelClass: TrackLocation,
        join: {
          from: 'tracks.id',
          to: 'trackLocations.trackId',
        },
      },
      photos: {
        relation: Model.HasManyRelation,
        modelClass: TrackPhoto,
        join: {
          from: 'tracks.id',
          to: 'trackPhotos.trackId',
        },
      },
      expedition: {
        relation: Model.BelongsToOneRelation,
        modelClass: Expedition,
        join: {
          from: 'tracks.expeditionId',
          to: 'expeditions.id',
        },
      },
    };
  }
}

module.exports = Track;
