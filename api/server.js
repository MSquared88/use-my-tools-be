//imports
const express = require('express');

//middleware
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('./Utils/auth/restricted-middleware')
const logger = require('./Utils/logger')

//routes
const usersRouter = require('./routes/users/users-route')
const toolsRouter = require('./routes/tools/tools-route')


//initiate server
const server = express()

// global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use(logger)

server.use('/api',usersRouter)

//restricted routes
server.use(restricted)

server.use('/api', toolsRouter)

module.exports = server