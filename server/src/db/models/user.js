const { Model } = require('objection');
const knex = require('knex');

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

User.findUserById = async function (id) {
  return knex('users').where('id', id).select('email', 'displayName');
};

User.modifyUser = async function (id, email, displayName) {
  knex('users').where('id', id).update({
    email: email,
    displayName: displayName,
  });
  return 'Ended';
};

module.exports = User;
