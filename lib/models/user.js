const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema)
