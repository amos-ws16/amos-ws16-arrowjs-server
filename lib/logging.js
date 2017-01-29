const Request = require('./models/request')
const packageInfoServer = require('../package.json')
const packageInfoEngine = require('../node_modules/arrow/package.json')

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
  var newRequest = new Request({ request: nRequest, response: nResponse, metaInfo: nMetaInfo })

  newRequest.save((err) => {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(newRequest._id)
    }
  })
}

module.exports = { addRequest }
