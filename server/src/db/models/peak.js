const { Model } = require('objection');
const knex = require('knex');

class Peak extends Model{
    static get className(){
        return 'peaks';
    }
}


module.exports = Peak;