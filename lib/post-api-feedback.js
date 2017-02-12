const feedback = require('./feedback')

/**
 * Handle the request req on POST /api/feedback and use res to respond.
 */
function postApiFeedback (req, res, done) {
  if (!req.body.uid || !req.body.cid) {
    res.json({success: false, err: 'Wrong input. Use case id and/or candidate id is missing.'})
    done()
    return
  }
  const reqUid = req.body.uid
  const reqCid = req.body.cid

  if (typeof reqCid !== 'string') {
    res.json({success: false, err: 'Candidate id has to be a string'})
    done()
    return
  }
  /**
   * Find an old request in the database with the reqUid and save the reqCid as feedback.
   */
  feedback.addFeedback(reqUid, reqCid, (err, doc) => {
    if (err) {
      res.json({success: false, err: 'Uid was not found in database.'})
      done()
      return
    }
    // Returns the UID, the CID and the whole request, if the feedback request is succeded.
    res.json({ success: true, uid: req.body.uid, cid: req.body.cid, request: doc.request })
    done()
  })
}
module.exports = postApiFeedback
