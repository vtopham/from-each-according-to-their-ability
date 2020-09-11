const db = require('../../db-config');

module.exports = {
    getHouseholds,
    getHouseholdById,
    addHousehold,
    updateHousehold,
    removeHousehold
}
    //get a list of all users
    function getHouseholds() {
        return db.select('*')
            .from('households')
    }
    //get a user by their id
    function getHouseholdById(id) {
        return db.select('*')
            .from('households')
            .where({id})
            
    }

    //create a new user
    function addHousehold(householdData) {
        return db('households')
            .insert(householdData)
            .then((ret) => {
                return ret
            })
    }

    //update an existing user
    function updateHousehold(id, householdData) {
        return db('households')
            .where({id})
            .update(householdData)
            .then((ret) => {
                return ret
            })
    }

    //remove an existing user
    function removeHousehold(id) {
        return db('households')
            .where({id})
            .del()
    }
