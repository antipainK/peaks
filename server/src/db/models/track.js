const { Model } = require('objection');

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
    };
  }
}

module.exports = Track;
