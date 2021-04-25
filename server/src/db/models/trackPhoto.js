const { Model } = require('objection');

class TrackPhoto extends Model {
  static get tableName() {
    return 'trackPhotos';
  }

  static get relationMappings() {
    const Track = require('./track');

    return {
      track: {
        relation: Model.BelongsToOneRelation,
        modelClass: Track,
        join: {
          from: 'trackPhotos.trackId',
          to: 'tracks.id',
        },
      },
    };
  }
}

module.exports = TrackPhoto;
