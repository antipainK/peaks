const { Model } = require('objection');

class ParticipantExpedition extends Model {
  static get className() {
    return 'participantsExpeditions';
  }
}

module.exports = ParticipantExpedition;
