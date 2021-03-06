const Request = require('./models/request')
const packageInfoServer = require('../package.json')
const packageInfoEngine = require('../node_modules/arrow/package.json')
const InvalidInputError = require('arrow/lib/invalid-input-error')

/**
 * This method adds a request and resonse to the database. Those can be given
 * in the format of any valid json. The callback method will be given the ID
 * of the request-response pair to find and update it in the database.
 * The version information of the server and engine gets saved as well as the
 * timestamp of the request.
 * arguments:
 * - nRequest: { ... } // any json representing the request
 * - nResponse: { ... } // any json representing the response
 * - callback: function (error|id) { ... }
 */
function addRequest (nRequest, nResponse, callback) {
  let d = new Date()
  let nMetaInfo = { timestamp: d.valueOf(), serverVersion: packageInfoServer.version, engineVersion: packageInfoEngine.version }
  let newRequest = { request: nRequest, response: nResponse, metaInfo: nMetaInfo }
  Request.create(newRequest, (err, savedObject) => {
    if (err) {
      throw new InvalidInputError('Database error: Error while saving Request')
    }
    callback(savedObject._id)
  })
}

module.exports = { addRequest }
