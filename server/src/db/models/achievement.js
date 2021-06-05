const { Model } = require('objection');

class Achievement extends Model {
  static get tableName() {
    return 'achievements';
  }
}

module.exports = Achievement;

module.exports.Types = {
  PEAK: 'PEAK',
};
