const { Model } = require('objection');

class TrackLocation extends Model {
  static get tableName() {
    return 'trackLocations';
  }

  static get relationMappings() {
    const Track = require('./track');

    return {
      track: {
        relation: Model.BelongsToOneRelation,
        modelClass: Track,
        join: {
          from: 'trackLocations.trackId',
          to: 'tracks.id',
        },
      },
    };
  }
}

module.exports = TrackLocation;
