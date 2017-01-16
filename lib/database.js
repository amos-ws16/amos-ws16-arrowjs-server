// Imports
var mongoose = require('mongoose')

/**
 * Internal connection to the database through mongoose
 */
var db = null

/**
 * Variable in which all mongoose model variables are stored. This is needed
 * for the buster tests and advanced queries that are not included in this
 * database interface.
 */
const model = {}

/**
 * Schema of Users in the database
 */
model.UserSchema = new mongoose.Schema({
  name: String,
  password: String
})

// Methods

/**
 * This method connects to the database with the given URL.
 * The URL should contain all information such as password, username, server
 * port and database name
 */
function connect (url) {
  // TODO: Choose between dev and prod here!!!
  mongoose.connect(url)
  db = mongoose.connection

  db.once('open', () => {
    // Build DB Schema
    model.User = mongoose.model('User', model.UserSchema)
  })
}

/**
 * This method searches in the database to find a user which matches
 * the name and the password. The result will be given in the callback
 * method with two arguments:
 * - err: error if it occurs during DB access
 * - doc: the javascript of the user which was found
 * NOTE: if this method matches multiple users then it will only return one
 * result.
 */
function findUser (userName, userPassword, callback) {
  model.User.findOne({ name: userName, password: userPassword }, callback)
}

module.exports = { model, connect, findUser }
