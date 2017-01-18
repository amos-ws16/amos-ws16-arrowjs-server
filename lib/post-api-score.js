const VError = require('verror').VError

const config = require('arrow/config/default')
const scoreManager = require('arrow')
const dbLib = require('../lib/database')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res) {
  let requestConfig = req.body.config || config
  try {
    let manager = scoreManager.create(requestConfig)
    let result = manager.score(req.body)
    var uID
    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: true}, result, (id) => {
      uID = id
      // only send response when database has saved request
      // If there was no exception up to this point, we have success.
      res.json({ success: true, uid: uID, result: result })
    })
    setTimeout(function () {
      dbLib.findRequest(uID, (result) => {
        console.log(result)
      })
    }, 2000)
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
        console.log('id: ' + id)
        uID = id
        res.json({ success: false, uid: uID, error: err.message })
      })
      return
    }

    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
      console.log('id: ' + id)
      uID = id
      res.json({ success: false, uid: uID, error: 'Internal Server Error' })
    })
    throw err
  }
}

module.exports = postApiScore
