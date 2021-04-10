const { Model } = require('objection');

class ParticipantExpedition extends Model {
  static get tableName() {
    return 'participantsExpeditions';
  }
}

module.exports = ParticipantExpedition;
