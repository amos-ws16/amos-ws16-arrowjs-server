const config = require('../../config')
const ScoreManager = require('../score-manager')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res) {
  let requestConfig = req.body.config || config.scoreManager
  let scoreManager = new ScoreManager(requestConfig)
  res.json(scoreManager.score(req.body))
}

module.exports = postApiScore
