'use strict'

const mongoose = require('mongoose')

const server = require('../lib')
const config = require('../config')

const cliPort = process.argv.length > 2 && process.argv[2] || undefined
const port = cliPort || process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect(config.database)

server.listen(port, () => {
  console.log(`Server started on Port: ${port}`)
})
