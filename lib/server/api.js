const express = require('express')
const config = require('../../config')

const router = express.Router()

let scoreManager = config.scoreManager

router.get('/welcome', (req, res) => {
  res.send('Welcome to ARROW')
})

router.get('/auth', (req, res) => {
  let data = { success: true, token: config.secretToken }
  res.json(data)
})

router.post('/score', function (req, res) {
  res.json(scoreManager.score(req.body))
})

module.exports = router
