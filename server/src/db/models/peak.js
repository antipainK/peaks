const { Model } = require('objection');

class Peak extends Model {
  static get tableName() {
    return 'peaks';
  }
}

module.exports = Peak;
