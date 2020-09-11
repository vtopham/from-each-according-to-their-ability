
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {id: 1, household_id: 1, name: 'general'},
        {id: 2, household_id: 1, name: 'kitchen'}
      ]);
    });
};
