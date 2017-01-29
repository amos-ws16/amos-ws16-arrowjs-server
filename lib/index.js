const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const database = require('../lib/database')

const app = express()

app.use(bodyParser.json())
app.use('/api', require('./api'))
app.use(require('./error-handler').errorHandler)

module.exports = function initializeServer (config) {
  mongoose.Promise = global.Promise
  app.locals.config = config
  app.start = () => {
    database.connect(config.database).then(() => {
      app.listen(config.port, () => {
        console.log(`Server started on Port: ${config.port} (${process.env.NODE_ENV} mode)`)
      })
    })
  }

  return app
}
