const {Model} = require('objection');

class Particpant extends Model{
    static get className(){
        return 'Participants';
    }
}

module.exports = Particpant;