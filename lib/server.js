'use strict'

let express = require('express')
let app = express()

app.get('/api/welcome', (req, res) => {
  let data = { message: 'Welcome to ARROW' }
  res.json(data)
})

module.exports = app
