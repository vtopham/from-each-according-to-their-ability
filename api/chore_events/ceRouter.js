
const express = require('express');

const CEvents = require('./ceModel')

const router = express.Router();

//get all chore events
router.get('/', (req, res) => {
    CEvents.getChoreEvents()
        .then(events => {
            res.status(200).json({message: events})
        })
        .catch(err => {
            res.status(500).json({message: "Error fetching chore events!", error: err})
        })
});

//get a chore event by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    CEvents.getChoreEventById(id)
        .then((event) => {
            if (event[0]) {
                res.status(200).json({message: event[0]}) 
            } else {
                res.status(404).json({message: "Chore event not found"})
            }
            
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching chore event!", error: err})
        })
    
})

//get a chore event by chore id

router.get('/chore/:id', (req, res) => {
    const id = req.params.id
    CEvents.getChoreEventsByChoreId(id)
        .then((events) => {
            res.status(200).json({message: events}) 
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching chore events!", error: err})
        })
    
})

//add a new chore event
router.post('/', (req, res) => {
    let choreEventData = req.body
    CEvents.addChoreEvent(choreEventData)
        .then(ret => {
            CEvents.getChoreEventById(ret[0])
                .then(event => {
                    res.status(201).json({message: "Chore event successfully created", profile: event})
                })
                .catch(err => {
                    res.status(500).json({message: "Error finding created chore event!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating chore event!", error: err})
        })
})

//update an existing chore event
router.put('/:id', (req, res) => {
    const choreEventData = req.body
    const id = req.params.id
    
    CEvents.updateChoreEvent(id, choreEventData)
        .then( _ => {
            CEvents.getChoreEventById(id)
                .then(event => {
                    res.status(201).json({message: "Event successfully updated!", payload: event})
                })
                .catch(err => {
                    res.status(500).json({message: "Error updating chore event, cannot find after update!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating chore event!", error: err})
        })
})

//delete a chore event

router.delete('/:id', (req, res) => {
    const id = req.params.id
    CEvents.removeChoreEvent(id)
        .then(ret => {
            res.status(201).json({message: "Chore event successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting chore event!", error: err})
        })
        
})

module.exports = router;