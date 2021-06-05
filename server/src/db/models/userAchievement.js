const { Model } = require('objection');

class UserAchievement extends Model {
  static get tableName() {
    return 'userAchievements';
  }
}

module.exports = UserAchievement;
