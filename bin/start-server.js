'use strict'

const mongoose = require('mongoose')

const server = require('../lib')
const dbConfig = require('../../db-config')

const cliPort = process.argv.length > 2 && process.argv[2] || undefined
const port = cliPort || process.env.PORT || 3000

mongoose.Promise = global.Promise
const db = process.env.NODE_ENV === 'production' ? dbConfig.prod : dbConfig.dev
mongoose.connect(db)

server.listen(port, () => {
  console.log(`Server started on Port: ${port}`)
})
