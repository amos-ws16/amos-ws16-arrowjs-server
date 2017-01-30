const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const database = require('../lib/database')

const app = express()

app.use(bodyParser.json())

// Attach application config directly to each request.
app.use((req, res, next) => {
  req.config = req.app.locals.config
  next()
})

app.use('/api', require('./api'))
app.use(require('./error-handler').errorHandler)

module.exports = function initializeServer (config) {
  mongoose.Promise = global.Promise
  app.locals.config = config

  app.start = () => {
    return database.connect(config.database).then(() => {
      http.createServer(app).listen(config.port, () => {
        console.log(`Server started on Port: ${config.port} (${process.env.NODE_ENV} mode)`)
      })
    })
  }

  return app
}
