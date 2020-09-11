const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const Households = require('./householdsModel')

const router = express.Router();

//get all households
router.get('/', (req, res) => {
    Households.getHouseholds()
        .then(hholds => {
            res.status(200).json({message: hholds})
        })
        .catch(err => {
            res.status(500).json({message: "Error fetching households!", error: err})
        })
});

//get a household by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Households.getHouseholdById(id)
        .then((hhold) => {
            if (hhold[0]) {
                res.status(200).json({message: hhold[0]}) 
            } else {
                res.status(404).json({message: "Household not found"})
            }
            
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching household!", error: err})
        })
    
})



//add a new household
router.post('/', (req, res) => {
    let householdData = req.body
    Households.addHousehold(householdData)
        .then(ret => {
            Households.getHouseholdById(ret[0])
                .then(hhold => {
                    res.status(201).json({message: "Household successfully created", profile: hhold})
                })
                .catch(err => {
                    res.status(500).json({message: "Error finding created household!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating household!", error: err})
        })
})

//update an existing household
router.put('/:id', (req, res) => {
    const householdData = req.body
    const id = req.params.id
    
    Households.updateHousehold(id, householdData)
        .then( _ => {
            Households.getHouseholdById(id)
                .then(hhold => {
                    res.status(201).json({message: "Household successfully updated!", payload: hhold})
                })
                .catch(err => {
                    res.status(500).json({message: "Error updating household, cannot find after update!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating household!", error: err})
        })
})

//delete a household

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Households.removeHousehold(id)
        .then(ret => {
            res.status(201).json({message: "Household successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting household!", error: err})
        })
        
})

module.exports = router;