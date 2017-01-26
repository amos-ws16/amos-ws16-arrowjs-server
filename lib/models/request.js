const mongoose = require('mongoose')

let requestSchema = new mongoose.Schema({
  request: { type: Object, required: true },
  response: { type: Object, required: true },
  feedback: { type: Object, default: null },
  error: { type: Object, default: null }
})

module.exports = mongoose.model('Request', requestSchema)
