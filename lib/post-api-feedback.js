const feedback = require('./feedback')

/**
 * Handle the request req on POST /api/feedback and use res to respond.
 */
function postApiFeedback (req, res) {
  if (!req.body.uid || !req.body.cid) {
    res.json({ success: false, error: 'Wrong input. Use case id and/or candidate id is missing.' })
    return
  }
  const reqUid = req.body.uid
  const reqCid = req.body.cid

  if (typeof reqCid !== 'string') {
    res.json({ success: false, error: 'Candidate id has to be a string' })
    return
  }
  /**
   * Find an old request in the database with the reqUid and save the reqCid as feedback.
   */
  feedback.addFeedback(reqUid, reqCid, (doc) => {
    if (!doc.success) {
      // Returns an error message, if reqUid is not in the database.
      res.json(doc)
      return
    }
    // Returns the UID, the CID and the whole request, if the feedback request is succeded.
    res.json({ success: true, UID: req.body.uid, CID: req.body.cid, DOC: doc })
  })
}
module.exports = postApiFeedback
