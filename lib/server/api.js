const express = require('express')
const config = require('../../config')
const ScoreManager = require('../../lib/score-manager')

const router = express.Router()

router.get('/welcome', (req, res) => {
  res.send('Welcome to ARROW')
})

router.get('/auth', (req, res) => {
  let data = { success: true, token: config.secretToken }
  res.json(data)
})

router.post('/score', (req, res) => {
  let scoreManager = new ScoreManager(config.scoreManager)
  res.json(scoreManager.score(req.body))
})

module.exports = router
