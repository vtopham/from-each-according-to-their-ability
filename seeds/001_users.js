
const secret = 'watermelon'
const bcrypt = require('bcryptjs')

const jasonPass = bcrypt.hashSync('jason')
const vicPass = bcrypt.hashSync('vic')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, household_id: 1, first_name: 'Victoria', last_name: 'Topham', password: vicPass},
        {id: 2, household_id: 1, first_name: 'Jason', last_name: 'Meisel', password: jasonPass}
      ]);
    });
};
