const { Model } = require('objection');

class Peak extends Model {
  static get tableName() {
    return 'peaks';
  }

  static get relationMappings() {
    const Expedition = require('./expedition');

    return {
      expeditions: {
        relation: Model.HasManyRelation,
        modelClass: Expedition,
        join: {
          from: 'peaks.id',
          to: 'expeditions.peakId',
        },
      },
    };
  }
}

module.exports = Peak;
