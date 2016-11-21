const config = require('../../config')
const scoreManager = require('../score-manager')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res, createScoreManager) {
  let createManager = createScoreManager || scoreManager.create

  let requestConfig = req.body.config || config.scoreManager
  let manager = createManager(requestConfig)
  res.json(manager.score(req.body))
}

module.exports = postApiScore
