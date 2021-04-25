const { Model } = require('objection');

class ExpeditionPhoto extends Model {
  static get tableName() {
    return 'expeditionPhotos';
  }
}

module.exports = ExpeditionPhoto;
