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

/**
 * Schema of a request, response, feedback
 */
model.RequestSchema = new mongoose.Schema({
  config: mongoose.Schema.Types.Mixed,
  file: mongoose.Schema.Types.Mixed,
  tasks: mongoose.Schema.Types.Mixed,
  success: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
  feedback: mongoose.Schema.Types.Mixed
})

// Methods

/**
 * This method connects to the database with the given URL.
 * The URL should contain all information such as password, username, server
 * port and database name
 */
function connect (url) {
  db = mongoose.createConnection(url)

  db.once('connected', () => {
    // Build DB Schema
    model.User = db.model('User', model.UserSchema)
    model.Token = db.model('Token', model.TokenSchema)
    model.Request = db.model('Request', model.RequestSchema)
  })

  return db
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

/**
 * This method adds a request and resonse to the database. Those can be given
 * in the format of any valid json. The callback method will be given the ID
 * of the request-response pair to find and update it in the database.
 * arguments:
 * - nRequest: { ... } // any json representing the request
 * - nResponse: { ... } // any json representing the response
 * - callback: function (error|id) { ... }
 */
function addRequest (nConfig, nFile, nTasks, nSuccess, nResult, callback) {
  var newRequest = new model.Request({config: nConfig, file: nFile, tasks: nTasks, success: nSuccess, result: nResult})
  newRequest.save((err) => {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(newRequest._id)
    }
  })
}

/**
 * With this method a request can be expanded with json information of the
 * feedback. Therefore, the id that can be obtained from the addRequest
 * method is needed.
 * Arguments:
 * - requestId: if from the callback of addRequest(...)
 * - nFeedback: { ... } // any json representing the feedback
 * - callback: function (err|doc) { ... }
 */
function addFeedback (requestId, nFeedback, callback) {
  model.Request.findByIdAndUpdate(
    requestId,
    { $set: { feedback: nFeedback } },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log(err)
        callback(err)
      } else {
        callback(doc)
      }
    })
}

module.exports = {
  model,
  connect,
  isUserValid,
  createToken,
  isTokenValid,
  addRequest,
  addFeedback
}
