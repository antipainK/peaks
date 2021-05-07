const {Model} = require('objection')

class UserPeakAchivement extends Model{
    static get tableName(){
        return 'userPeakAchivements';
    }
}

module.exports = UserPeakAchivement;