const { Model } = require('objection');

class ExpeditionInvite extends Model {
  static get tableName() {
    return 'expeditionRoutes';
  }
  static get relationMappings() {
    const User = require('./user');
    const Expedition = require('./expedition');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'expeditionRoutes.userId',
          to: 'users.id',
        },
      },
      expedition: {
        relation: Model.BelongsToOneRelation,
        modelClass: Expedition,
        join: {
          from: 'expeditionRoutes.expeditionId',
          to: 'exxpeditions.id',
        },
      },
    };
  }
}

module.exports = ExpeditionInvite;
