const VError = require('verror').VError

const config = require('arrow/config/default')
const scoreManager = require('arrow')
const dbLib = require('../lib/database')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res) {
  let requestConfig = req.body.config || config
  console.log(requestConfig)
  console.log(req.body.file)
  console.log(req.body.tasks)
  try {
    let manager = scoreManager.create(requestConfig)
    let result = manager.score(req.body)
    console.log(result)
    console.log({success: true})
    dbLib.addRequest(requestConfig, req.body.file, req.body.tasks, {success: true}, result, (id) => {
      console.log('id: ' + id)
    })
    // If there was no exception up to this point, we have success.
    res.json({ success: true, result: result })
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      res.json({ success: false, error: err.message })
      console.log('hier')
      return
    }

    res.json({ success: false, error: 'Internal Server Error' })
    console.log('hier')
    throw err
  }
}

module.exports = postApiScore
