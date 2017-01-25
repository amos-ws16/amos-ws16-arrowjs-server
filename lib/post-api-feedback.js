const Feedback = require('./models/request')

/**
 * This method adds a request and resonse to the database. Those can be given
 * in the format of any valid json. The callback method will be given the ID
 * of the request-response pair to find and update it in the database.
 * arguments:
 * - nRequest: { ... } // any json representing the request
 * - nResponse: { ... } // any json representing the response
 * - callback: function (error|id) { ... }
 */
function addFeedback (nRequest, nResponse, callback) {
  var newFeedback = new Feedback({ request: nRequest, response: nResponse })

  newFeedback.save((err) => {
    if (err) {
      console.log(err)
      callback(err)
    } else {
      callback(newFeedback._id)
    }
  })
}

module.exports = { addFeedback }
