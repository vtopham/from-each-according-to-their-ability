
const express = require('express');

const Rooms = require('./roomsModel')

const router = express.Router();

//get all Rooms
router.get('/', (req, res) => {
    Rooms.getRooms()
        .then(rooms => {
            res.status(200).json({message: rooms})
        })
        .catch(err => {
            res.status(500).json({message: "Error fetching rooms!", error: err})
        })
});

//get a room by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Rooms.getRoomById(id)
        .then((room) => {
            if (room[0]) {
                res.status(200).json({message: room[0]}) 
            } else {
                res.status(404).json({message: "Room not found"})
            }
            
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching room!", error: err})
        })
    
})

//get a room by household id

router.get('/household/:id', (req, res) => {
    const id = req.params.id
    Rooms.getRoomsByHouseholdId(id)
        .then((rooms) => {
            res.status(200).json({message: rooms}) 
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching room!", error: err})
        })
    
})

//add a new room
router.post('/', (req, res) => {
    let roomData = req.body
    Rooms.addRoom(roomData)
        .then(ret => {
            Rooms.getRoomById(ret[0])
                .then(room => {
                    res.status(201).json({message: "Room successfully created", profile: room})
                })
                .catch(err => {
                    res.status(500).json({message: "Error finding created room!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating room!", error: err})
        })
})

//update an existing room
router.put('/:id', (req, res) => {
    const roomData = req.body
    const id = req.params.id
    
    Rooms.updateRoom(id, roomData)
        .then( _ => {
            Rooms.getRoomById(id)
                .then(room => {
                    res.status(201).json({message: "Room successfully updated!", payload: room})
                })
                .catch(err => {
                    res.status(500).json({message: "Error updating room, cannot find after update!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating room!", error: err})
        })
})

//delete a room

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Rooms.removeRoom(id)
        .then(ret => {
            res.status(201).json({message: "Room successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting room!", error: err})
        })
        
})

module.exports = router;