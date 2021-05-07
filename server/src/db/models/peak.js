const { Model } = require('objection');

class Peak extends Model {
  static get tableName() {
    return 'peaks';
  }

  static get relationMappings() {
    const Expedition = require('./expedition');
    const UserPeakAchivement = require('./userPeakAchivement');

    return {
      expeditions: {
        relation: Model.HasManyRelation,
        modelClass: Expedition,
        join: {
          from: 'peaks.id',
          to: 'expeditions.peakId',
        },  
      },
      peakAchivements:{
        relation: Model.HasManyRelation,
        modelClass: UserPeakAchivement,
        join:{
          from: 'peaks.id',
          to: 'userPeakAchivements.peakId',
        },
      },
    };
  }
}

module.exports = Peak;
