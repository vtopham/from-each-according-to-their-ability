
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chore_events').del()
    .then(function () {
      // Inserts seed entries
      return knex('chore_events').insert([
        {id: 1, completed_date: new Date(), completed_by_id: 1, chore_id: 1, household_id: 1}
      ]);
    });
};
