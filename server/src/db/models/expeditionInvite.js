const { Model } = require('objection');

class ExpeditionInvite extends Model {
  static get tableName() {
    return 'expeditionInvites';
  }

  static get relationMappings() {
    const User = require('./user');
    const Expedition = require('./expedition');

    return {
      from: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'expeditionInvites.fromId',
          to: 'users.id',
        },
      },
      to: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'expeditionInvites.toId',
          to: 'users.id',
        },
      },
      expedition: {
        relation: Model.BelongsToOneRelation,
        modelClass: Expedition,
        join: {
          from: 'expeditionInvites.expeditionId',
          to: 'expeditions.id',
        },
      },
    };
  }
}

module.exports = ExpeditionInvite;
