const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const Chores = require('./choresModel')

const router = express.Router();

//get all chores
router.get('/', (req, res) => {
    Chores.getChores()
        .then(chores => {
            res.status(200).json({message: chores})
        })
        .catch(err => {
            res.status(500).json({message: "Error fetching chores!", error: err})
        })
});

//get a chore by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Chores.getChoreById(id)
        .then((chores) => {
            if (chores[0]) {
                res.status(200).json({message: chores[0]}) 
            } else {
                res.status(404).json({message: "Chore not found"})
            }
            
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching chore!", error: err})
        })
    
})

//get chores by assignee
router.get('/assignee/:id', (req, res) => {
    const id = req.params.id
    Chores.getChoresByAssignee(id)
        .then((chores) => {
            res.status(200).json({message: chores}) 
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching chore!", error: err})
        })
    
})
//get chores by household id

router.get('/household/:id', (req, res) => {
    const id = req.params.id
    Chores.getChoresByHouseholdId(id)
        .then((chores) => {
            res.status(200).json({message: chores}) 
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching chore!", error: err})
        })
    
})

//add a new chore
router.post('/', (req, res) => {
    let choreData = req.body
    Chores.addChore(choreData)
        .then(ret => {
            Chores.getChoreById(ret[0])
                .then(hhold => {
                    res.status(201).json({message: "Chore successfully created", profile: hhold})
                })
                .catch(err => {
                    res.status(500).json({message: "Error finding created chore!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating chore!", error: err})
        })
})

//update an existing chore
router.put('/:id', (req, res) => {
    const choreData = req.body
    const id = req.params.id
    
    Chores.updateChore(id, choreData)
        .then( _ => {
            Chores.getChoreById(id)
                .then(hhold => {
                    res.status(201).json({message: "Chore successfully updated!", payload: hhold})
                })
                .catch(err => {
                    res.status(500).json({message: "Error updating chore, cannot find after update!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating chore!", error: err})
        })
})

//delete a chore

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Chores.removeChore(id)
        .then(ret => {
            res.status(201).json({message: "Chore successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting chore!", error: err})
        })
        
})

module.exports = router;