const { Model } = require('objection');

class ExpeditionInvite extends Model {
  static get className() {
    return 'expeditionInvites';
  }
}

module.exports = ExpeditionInvite;
