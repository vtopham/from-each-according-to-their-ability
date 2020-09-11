
exports.up = function(knex) {
  return knex.schema
  //household id initializes as null until a household is created
  .createTable('users', tbl => {
      tbl.increments('id');
      tbl.integer('household_id');
      tbl.string('first_name')
        .notNullable();
      tbl.string('last_name');
  })
  //invite code is null until the admin generates one
  .createTable('households', tbl => {
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.string('invite_code');
      tbl.integer('admin_id')
        .references('id')
        .inTable('users')
        .notNullable();
  })
  //each house has rooms that can have chores assigned to them
  .createTable('rooms', tbl => {
      tbl.increments('id');
      tbl.integer('household_id')
        .references('id')
        .inTable('households')
        .notNullable();
      tbl.string('name')
        .notNullable();
  })
  //list of all chores, if frequency is null it's a free one, and the assigned will say the null user
  //TODO: might not need household id?
  .createTable('chores', tbl => {
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.integer('frequency_days');
      tbl.integer('assigned_to')
        .references('id')
        .inTable('users')
        .notNullable();
      tbl.integer('household_id')
        .references('id')
        .inTable('households')
        .notNullable();
      tbl.integer('room_id')
        .references('id')
        .inTable('rooms')
        .notNullable();
  })
  //keep track of who's doing chores when
  .createTable('chore_events', tbl => {
      tbl.increments('id');
      tbl.date('completed_date')
        .notNullable();
      tbl.integer('completed_by_id')
        .notNullable()
        .references('id')
        .inTable('users');
  })
};

//TODO: cascades to drop users when somebody moves out
exports.down = function(knex) {
  return knex.schema    
    .dropTableIfExists('users')
    .dropTableIfExists('households')
    .dropTableIfExists('rooms')
    .dropTableIfExists('chores')
    .dropTableIfExists('chore_events')
};
