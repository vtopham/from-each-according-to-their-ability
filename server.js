const express = require('express');
const server = express()
const cors = require('cors')
const helmet = require('helmet')
// const UserRouter = require('./api/userRouter')

server.use(express.json());
server.use(cors());
server.use(helmet());
// server.use('/',UserRouter)
server.get('/', (req, res) => {
    res.status(200).json({message: "hi there, you did it!"})
})

module.exports = server;