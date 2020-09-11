const db = require('../../db-config');

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser
}
    //get a list of all users
    function getUsers() {
        return db.select('id', 'household_id', 'first_name', 'last_name')
            .from('users')
    }
    //get a user by their id
    function getUserById(id) {
        return db.select('id', 'household_id', 'first_name', 'last_name')
            .from('users')
            .where({id})
            
    }

    //create a new user
    function addUser(userData) {
        return db('users')
            .insert(userData)
            .then((ret) => {
                return ret
            })
    }

    //update an existing user
    function updateUser(id, userData) {
        return db('users')
            .where({id})
            .update(userData)
            .then((ret) => {
                return ret
            })
    }

    //remove an existing user
    function removeUser(id) {
        return db('users')
            .where({id})
            .del()
    }
