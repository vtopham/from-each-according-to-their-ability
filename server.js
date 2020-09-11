const express = require('express');
const server = express()
const cors = require('cors')
const helmet = require('helmet')
const CeRouter = require('./api/chore_events/ceRouter')
const ChoresRouter = require('./api/chores/choresRouter')
const HouseRouter = require('./api/households/householdsRouter')
const RoomsRouter = require('./api/rooms/roomsRouter')
const UsersRouter = require('./api/users/usersRouter')

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use('/choreevents',CeRouter)
server.use('/chores', ChoresRouter)
server.use('/households', HouseRouter)
server.use('/rooms', RoomsRouter)
server.use('/users', UsersRouter)

server.get('/', (req, res) => {
    res.status(200).json({message: "hi there, you did it!"})
})

module.exports = server;