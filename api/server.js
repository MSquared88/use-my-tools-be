//imports
const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('./utils/restricted-middleware')

//routes

//initiate server
const server = express()

// global middleware
server.use(express.json())
server.use(helmet())
server.use(cors())

module.exports = server