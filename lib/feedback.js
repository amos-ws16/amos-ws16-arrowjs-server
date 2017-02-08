const Request = require('./models/request')

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
  Request.findByIdAndUpdate(
    requestId,
    { $set: { feedback: nFeedback } },
    { new: true },
    callback
  )
}
module.exports = { addFeedback }
