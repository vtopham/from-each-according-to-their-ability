const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({message: "You reached the rooms router"})
});

module.exports = router;