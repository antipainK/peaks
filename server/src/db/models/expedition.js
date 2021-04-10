const { Model } = require('objection');

class Expedition extends Model {
  static get tableName() {
    return 'expeditions';
  }
}

module.exports = Expedition;
