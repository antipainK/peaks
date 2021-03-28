const { Model } = require('objection');
const knex = require('knex');

class Peak extends Model{
    static get className(){
        return 'peaks';
    }
}

Peak.findPeakById = async function(id){
    return knex('peaks')
    .where('id', id)
    .select('name', 'absHeight', 'description', 'mountainRange');
};


module.exports = Peak;