const feedback = require('./feedback')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiFeedback (req, res) {
  if (!req.body.uid || !req.body.cid) {
    res.json({ success: false, error: 'Wrong input. Use case id and/or candidate id is missing.' })
    return
  }
  const reqUid = req.body.uid
  const reqCid = req.body.cid

  if (typeof reqCid !== 'number') {
    res.json({ success: false, error: 'Candidate id has to be a number' })
    return
  }

  feedback.addFeedback(reqUid, reqCid, (doc) => {
    if (!doc.success) {
      res.json(doc)
      return
    }
    res.json({ success: true, UID: req.body.uid, CID: req.body.cid, DOC: doc })
  })
}
module.exports = postApiFeedback
