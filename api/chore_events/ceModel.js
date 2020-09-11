const db = require('../../db-config');

module.exports = {
    getChoreEvents,
    getChoreEventById,
    getChoreEventsByChoreId,
    getChoreEventsByUserId,
    getChoreEventsByHouseholdId,
    addChoreEvent,
    updateChoreEvent,
    removeChoreEvent
}
    //get a list of all users
    function getChoreEvents() {
        return db.select('*')
            .from('chore_events')
    }
    //get a user by their id
    function getChoreEventById(id) {
        return db.select('*')
            .from('chore_events')
            .where({id})
            
    }

    //get all events for a chore
    function getChoreEventsByChoreId(chore_id) {
        return db.select('*')
            .from('chore_events')
            .where({chore_id})
    }
    
    //get all chore events for a user
    function getChoreEventsByUserId(completed_by_id) {
        return db.select('*')
            .from('chore_events')
            .where({completed_by_id})
    }

    //get all chore events for a household
    function getChoreEventsByHouseholdId(household_id) {
        return db.select('*')
            .from('chore_events')
            .where({household_id})
    }

    //create a new user
    function addChoreEvent(choreEventData) {
        return db('chore_events')
            .insert(choreEventData)
            .then((ret) => {
                return ret
            })
    }

    //update an existing user
    function updateChoreEvent(id, choreEventData) {
        return db('chore_events')
            .where({id})
            .update(choreEventData)
            .then((ret) => {
                return ret
            })
    }

    //remove an existing user
    function removeChoreEvent(id) {
        return db('chore_events')
            .where({id})
            .del()
    }
