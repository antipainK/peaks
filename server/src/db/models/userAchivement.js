const { Model } = require('objection');

class UserAchivement extends Model {
  static get tableName() {
    return 'userAchivements';
  }

  static get relationMappings() {
    const Achivement = require('./achivement');

    return {
      achivement: {
        relation: Model.BelongsToOneRelation,
        modelClass: Achivement,
        join: {
          from: 'userAchivements.achivementId',
          to: 'achivements.id',
        },
      },
    };
  }
}

module.exports = UserAchivement;
