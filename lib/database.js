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

/**
 * Schema of a Tokes in the databse
 */
model.TokenSchema = new mongoose.Schema({
  createdAt: { type: Date, expires: '3600s', default: Date.now }, // Expire after 15 s
  identifier: { type: String, required: true }
})

// Methods

/**
 * This method connects to the database with the given URL.
 * The URL should contain all information such as password, username, server
 * port and database name
 */
function connect (url) {
  mongoose.connect(url)
  db = mongoose.connection

  db.once('open', () => {
    // Build DB Schema
    model.User = mongoose.model('User', model.UserSchema)
    model.Token = mongoose.model('Token', model.TokenSchema)
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

/**
 * This method checks if a user with the given name and password exists in
 * our database. If yes, the callback function callback(valid) will be given
 * true or false as an input argument. This is an ASYNCHRONOUS call as the
 * connection to mongodb is asynchronous!
 * Arguments:
 * - userName: name of the user
 * - userPassword: password of the user
 * - callback: function (valid) { ... } where valid is true or fakse
 */
function isUserValid (userName, userPassword, callback) {
  findUser(userName, userPassword, (err, doc) => {
    if (err) {
      callback(false)
      return
    }
    if (doc === null) {
      callback(false)
    } else {
      callback(true)
    }
  })
}

/**
 * This method searches in the database to find a token which matches
 * the tokenId. The result will be given in the callback
 * method with two arguments:
 * - err: error if it occurs during DB access
 * - doc: the javascript of the user which was found
 * NOTE: if this method matches multiple tokens then it will only return one
 * result.
 */
function findToken (tokenId, callback) {
  model.Token.findOne({ identifier: tokenId }, callback)
}

/**
 * This method creates a token in the database with the given tokenId
 * (this is not equal to the MongoDB-Id). The Token has TTL-value of
 * 3600s and will automatically be deleted from the DB. The callback
 * will be given true/false as an argument that shows if the token
 * was created in the DB.
 */
function createToken (tokenId, callback) {
  var newToken = new model.Token({ identifier: tokenId })
  newToken.save((err) => {
    if (err) {
      console.log(err)
      callback(false)
    } else {
      callback(true)
    }
  })
}

/**
 * This method checks if a token with the given tokenId is valid (it exists
 * in the DB). The callback function will return the truth value for this
 * property. This is an ASYNCHRONOUS call as the
 * connection to mongodb is asynchronous!
 * Arguments:
 * - tokenId: The id of the token (not the MongoDB-Id!)
 * - callback: function (valid) { ... }
 */
function isTokenValid (tokenId, callback) {
  findToken(tokenId, (err, doc) => {
    if (err) {
      console.log(err)
      callback(false)
      return
    }
    if (doc === null) {
      callback(false)
    } else {
      callback(true)
    }
  })
}

module.exports = { model, connect, isUserValid, createToken, isTokenValid }
