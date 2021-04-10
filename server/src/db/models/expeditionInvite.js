const { Model } = require('objection');

class ExpeditionInvite extends Model {
  static get tableName() {
    return 'expeditionInvites';
  }
}

module.exports = ExpeditionInvite;
