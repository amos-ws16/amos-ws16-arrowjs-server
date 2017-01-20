const express = require('express')
const bodyParser = require('body-parser')
var dbLib = require('../lib/database')
var dbConfig = require('../../db-config.js')

const app = express()

// Initialize database
if (process.env.NODE_ENV === 'production') {
  dbLib.connect(dbConfig.prod)
} else {
  dbLib.connect(dbConfig.dev)
}

app.use(bodyParser.json())
app.use('/api', require('./api'))

module.exports = app
