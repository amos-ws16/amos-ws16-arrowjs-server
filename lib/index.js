const errorHandler = require('./error-handler').errorHandler
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use('/api', require('./api'))
app.use(errorHandler)

module.exports = app
