const { Model } = require('objection');

class Expedition extends Model {
  static get className() {
    return 'expeditions';
  }
}

module.exports = Expedition;
