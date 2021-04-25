const { Model } = require('objection');

class TrackPhoto extends Model {
  static get tableName() {
    return 'trackPhotos';
  }
}

module.exports = TrackPhoto;
