
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chores').del()
    .then(function () {
      // Inserts seed entries
      return knex('chores').insert([
        {id: 1, name: 'garbage', frequency_days: null, assigned_to: 1, household_id: 1, room_id: 1},
        {id: 2, name: 'dishes', frequency_days: null, assigned_to: 2, household_id: 1, room_id: 2},
        {id: 3, name: 'mop', frequency_days: 7, assigned_to: 2, household_id: 1, room_id: 2}
      ]);
    });
};
