const config = require('arrow/config/default')
const scoreManager = require('arrow')
// const dbLib = require('../lib/database')
const logging = require('./logging')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res, done) {
  let requestConfig = req.body.config || config

  let manager = scoreManager.create(requestConfig)
  let result = manager.score(req.body)

  // If there was no exception up to this point, we have success.
  let sRes = { success: true, result: result }
  logging.addRequest(req.body, sRes, (id) => {
    sRes.uid = id
    res.json(sRes)
    if (done) done()
  })
}

module.exports = postApiScore
