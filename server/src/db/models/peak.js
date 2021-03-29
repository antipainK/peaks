const { Model } = require('objection');

class Peak extends Model {
  static get className() {
    return 'peaks';
  }
}

module.exports = Peak;
