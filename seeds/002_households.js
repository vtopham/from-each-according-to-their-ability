
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('households').del()
    .then(function () {
      // Inserts seed entries
      return knex('households').insert([
        {id: 1, name: 'Home sweet home', invite_code: 'abcd', admin_id: 1}
      ]);
    });
};
