const { Model } = require('objection');

class ExpeditionLocation extends Model {
  static get tableName() {
    return 'expeditionLocations';
  }
}

module.exports = ExpeditionLocation;
