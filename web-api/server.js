'use strict'

let express = require('express')
let app = express()

let data = ['Hello', 'my', 'REST', 'API']

app.get('/api/users', (req, res) => {
  res.json(data)
})

module.exports = app
