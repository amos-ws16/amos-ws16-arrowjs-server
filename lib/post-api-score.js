const config = require('arrow/config/default')
const scoreManager = require('arrow')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res) {
  let requestConfig = req.body.config || config
  let manager = scoreManager.create(requestConfig)
  let result = manager.score(req.body)

  // If there was no exception up to this point, we have success.
  res.json({ success: true, result: result })
}

module.exports = postApiScore
