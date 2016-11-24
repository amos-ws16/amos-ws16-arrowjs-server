'use strict'

const server = require('../lib/server')

const cliPort = process.argv.length > 2 && process.argv[2] || undefined
const port = cliPort || process.env.PORT || 3000

server.listen(port, () => {
  console.log(`Server started on Port: ${port}`)
})
