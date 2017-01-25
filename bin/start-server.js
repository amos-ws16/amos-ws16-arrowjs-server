'use strict'

const https = require('https')
const http = require('http')
const fs = require('fs')
const mongoose = require('mongoose')
const server = require('../lib')
const dbConfig = require('../../db-config')

// This line is from the Node.js HTTPS documentation.
const options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
}

const cliPort = process.argv.length > 2 && process.argv[2] || undefined
const port = cliPort || process.env.PORT || 3000

mongoose.Promise = global.Promise
const db = process.env.NODE_ENV === 'production' ? dbConfig.prod : dbConfig.dev
mongoose.connect(db)

if (process.env.NODE_ENV === 'development') {
  http.createServer(server).listen(port, undefined, undefined, () => {
    console.log(`Server started on port: ${port} (http, development mode)`)
  })
} else {
  https.createServer(options, server).listen(port, undefined, undefined, () => {
    console.log(`Server started on Port: ${port} (https, production mode)`)
  })
}

