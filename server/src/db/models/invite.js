const { Model } = require('objection');

class Invite extends Model {
  static get className() {
    return 'invites';
  }
}

module.exports = Invite;
