const db = require('../../db-config');

module.exports = {
    getChores,
    getChoreById,
    getChoresByAssignee,
    getChoresByHouseholdId,
    addChore,
    updateChore,
    removeChore
}
    //get a list of all chores
    function getChores() {
        return db.select('*')
            .from('chores')
    }
    //get a chore by their id
    function getChoreById(id) {
        return db.select('*')
            .from('chores')
            .where({id})
            
    }

    function getChoresByAssignee(assigned_to) {
        return db.select('*')
            .from('chores')
            .where({assigned_to})
    }

    //get chores by household id

    function getChoresByHouseholdId(household_id) {
        return db.select('*')
            .from('chores')
            .where({household_id})
    }

    //create a new user
    function addChore(choreData) {
        return db('chores')
            .insert(choreData)
            .then((ret) => {
                return ret
            })
    }

    //update an existing user
    function updateChore(id, choreData) {
        return db('chores')
            .where({id})
            .update(choreData)
            .then((ret) => {
                return ret
            })
    }

    //remove an existing user
    function removeChore(id) {
        return db('chores')
            .where({id})
            .del()
    }
