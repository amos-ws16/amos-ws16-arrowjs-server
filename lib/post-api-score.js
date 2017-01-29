const config = require('arrow/config/default')
const scoreManager = require('arrow')
// const dbLib = require('../lib/database')
const logging = require('./logging')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res, done) {
  let requestConfig = req.body.config || config
/* <<<<<<< HEAD
  try {
    let manager = scoreManager.create(requestConfig)
    let result = manager.score(req.body)
    let sRes = { success: true, result: result }

    logging.addRequest(req.body, sRes, (id) => {
      // only send response when database has saved request
      // If there was no exception up to this point, we have success.
      sRes.uid = id
      res.json(sRes)

      if (done) done()
    })
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      let sRes = { success: false, error: err.message }
      logging.addRequest(req.body, sRes, (id) => {
        sRes.uid = id
        res.json(sRes)
        if (done) done()
      })
      return
    }
    let sRes = { success: false, error: 'Internal Server Error' }
    logging.addRequest(req.body, sRes, (id) => {
      sRes.uid = id
      res.json(sRes)
      if (done) done()
    })
    throw err
  }
======= */
  let manager = scoreManager.create(requestConfig)
  let result = manager.score(req.body)

  // If there was no exception up to this point, we have success.
  let sRes = { success: true, result: result }
  logging.addRequest(req.body, sRes, (id) => {
    sRes.uid = id
    res.json(sRes)
    if (done) done()
  })
// >>>>>>> dev
}

module.exports = postApiScore
