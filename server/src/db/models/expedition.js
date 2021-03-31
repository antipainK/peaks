const { Model } = require('objection');

class Expedition extends Model{
    static get className(){
        return 'Expedition';
    }
}

module.exports = Expedition;