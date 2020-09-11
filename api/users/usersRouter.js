const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const bcrypt = require('bcryptjs')
const Users = require('./usersModel')

const router = express.Router();

//get all users
router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json({message: users})
        })
        .catch(err => {
            res.status(500).json({message: "Error fetching users!", error: err})
        })
});

//get a user by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Users.getUserById(id)
        .then((user) => {
            if (user[0]) {
                res.status(200).json({message: user[0]}) 
            } else {
                res.status(404).json({message: "User not found"})
            }
            
        })
        .catch((err) => {
            res.status(500).json({message: "Error fetching user!", error: err})
        })
    
})

//add a new user
router.post('/', (req, res) => {
    let userData = req.body
    userData.password = bcrypt.hashSync(req.body.password)
    Users.addUser(userData)
        .then(ret => {
            Users.getUserById(ret[0])
                .then(user => {
                    res.status(201).json({message: "User successfully created", profile: user})
                })
                .catch(err => {
                    res.status(500).json({message: "Error finding created user!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error creating user!", error: err})
        })
})

//update an existing user
router.put('/:id', (req, res) => {
    const userData = req.body
    const id = req.params.id
    //TODO: encrypt password if included
    Users.updateUser(id, userData)
        .then( _ => {
            Users.getUserById(id)
                .then(user => {
                    res.status(201).json({message: "User successfully updated!", payload: user})
                })
                .catch(err => {
                    res.status(500).json({message: "Error updating user, cannot find after update!", error: err})
                })
        })
        .catch(err => {
            res.status(500).json({message: "Error updating user!", error: err})
        })
})

//delete a user

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Users.removeUser(id)
        .then(ret => {
            res.status(201).json({message: "User successfully deleted"})
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting user!", error: err})
        })
        
})

module.exports = router;