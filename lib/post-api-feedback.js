const feedback = require('./feedback')
const InvalidInputError = require('arrow/lib/invalid-input-error')

/**
 * Handle the request req on POST /api/feedback and use res to respond.
 */
function postApiFeedback (req, res) {
  if (!req.body.uid || !req.body.cid) {
    throw new InvalidInputError('Wrong input. Use case id and/or candidate id is missing.')
  }
  const reqUid = req.body.uid
  const reqCid = req.body.cid

  if (typeof reqCid !== 'string') {
    throw new InvalidInputError('Candidate id has to be a string')
  }
  /**
   * Find an old request in the database with the reqUid and save the reqCid as feedback.
   */
  feedback.addFeedback(reqUid, reqCid, (err, doc) => {
    if (err) {
      throw new InvalidInputError('Uid was not found in database.')
    }
    // Returns the UID, the CID and the whole request, if the feedback request is succeded.
    res.json({ success: true, uid: req.body.uid, cid: req.body.cid, request: doc.request })
  })
}
module.exports = postApiFeedback
