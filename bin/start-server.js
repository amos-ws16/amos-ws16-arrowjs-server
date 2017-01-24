'use strict'

const mongoose = require('mongoose')

const server = require('../lib')
const config = require('../config')
const database = require('../lib/database')

const cliPort = process.argv.length > 2 && process.argv[2] || undefined
const port = cliPort || config.port

mongoose.Promise = global.Promise
// const db = process.env.NODE_ENV === 'production' ? dbConfig.prod : dbConfig.dev
// mongoose.connect(db)
database.connect(config.database).then(() => {
  server.listen(port, () => {
    console.log(`Server started on Port: ${port} (${process.env.NODE_ENV} mode)`)
  })
})
