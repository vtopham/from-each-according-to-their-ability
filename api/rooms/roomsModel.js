const db = require('../../db-config');

module.exports = {
    getRooms,
    getRoomById,
    getRoomsByHouseholdId,
    addRoom,
    updateRoom,
    removeRoom
}
    //get a list of all rooms
    function getRooms() {
        return db.select('*')
            .from('rooms')
    }
    //get a room by their id
    function getRoomById(id) {
        return db.select('*')
            .from('rooms')
            .where({id})
            
    }

    //get all the rooms for a household
    function getRoomsByHouseholdId(household_id) {
        return db.select('*')
            .from('rooms')
            .where({household_id})
    }


    //create a new room
    function addRoom(roomData) {
        return db('rooms')
            .insert(roomData)
            .then((ret) => {
                return ret
            })
    }

    //update an existing room
    function updateRoom(id, roomData) {
        return db('rooms')
            .where({id})
            .update(roomData)
            .then((ret) => {
                return ret
            })
    }

    //remove an existing room
    function removeRoom(id) {
        return db('rooms')
            .where({id})
            .del()
    }
