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
    var unsereID
    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: true}, result, (id) => {
      console.log('id: ' + id)
      unsereID = id
    })
    setTimeout(function () {
      dbLib.findRequest(unsereID, (result) => {
        console.log(result)
      })
    }, 2000)
    // If there was no exception up to this point, we have success.
    res.json({ success: true, result: result })
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      res.json({ success: false, error: err.message })
      dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
        console.log('id: ' + id)
        unsereID = id
      })
      return
    }

    res.json({ success: false, error: 'Internal Server Error' })
    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: false}, null, (id) => {
      console.log('id: ' + id)
      unsereID = id
    })
    throw err
  }
}

module.exports = postApiScore
