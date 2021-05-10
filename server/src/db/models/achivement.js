const {Model} = require('objection');

class Achivement extends Model{
    static get tableName(){
        return 'achivements';
    }

    static get relationMappings(){
        const Peak = require('./peak');

        return{
            peak:{
                relation: Model.BelongsToOneRelation,
                modelClass= Peak,
                join:{
                    from: 'achivements.peakId',
                    to: 'peaks.id',
                },
            },
        };
    }
}

module.exports = Achivement;