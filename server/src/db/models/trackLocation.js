const { Model } = require('objection');

class TrackLocation extends Model {
  static get tableName() {
    return 'trackLocations';
  }
}

module.exports = TrackLocation;
