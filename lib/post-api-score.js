const VError = require('verror').VError

const config = require('arrow/config/default')
const scoreManager = require('arrow')
const dbLib = require('../lib/database')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res, done) {
  let requestConfig = req.body.config || config
  try {
    let manager = scoreManager.create(requestConfig)
    let result = manager.score(req.body)
    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: true}, result, (id) => {
      // only send response when database has saved request
      // If there was no exception up to this point, we have success.
      res.json({ success: true, result: result })
      if (done) done()
    })
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
        res.json({ success: false, error: err.message })
        if (done) done()
      })
      return
    }

    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
      res.json({ success: false, error: 'Internal Server Error' })
      if (done) done()
    })
    throw err
  }
}

module.exports = postApiScore
