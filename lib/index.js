const https = require('https')
const http = require('http')
const fs = require('fs')
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

/**
 * Return an encrypted nodejs https or unencrypted http server with app as the
 * event handler if the useHttps flag is set or not respectively.
 */
function makeServer (app, useHttps) {
  if (!useHttps) {
    return http.createServer(app)
  }

  const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem')
  }

  return https.createServer(options, app)
}

module.exports = function initializeServer (config) {
  mongoose.Promise = global.Promise
  app.locals.config = config
  // const useHttps = process.env.NODE_ENV === 'production'

  app.start = () => {
    return database.connect(config.database).then(() => {
      makeServer(app, config.useHttps).listen(config.port, () => {
        console.log(`Server started on Port: ${config.port} (${process.env.NODE_ENV} mode)`)
      })
    })
  }

  return app
}
