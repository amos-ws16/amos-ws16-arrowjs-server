const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

// TODO: This is most probably not the correct way to store data used by the
//       app. Research how it should be done (best practices with expressjs)
let scoreManager = null
app.setScoreManager = function (manager) {
  scoreManager = manager
}

app.get('/api/welcome', (req, res) => {
  res.send('Welcome to ARROW - deployed via travis')
})

app.get('/api/auth', (req, res) => {
  let data = { success: true, token: secretToken }
  res.json(data)
})

app.post('/api/score', function (req, res) {
  // console.log(req.body)
  res.json(scoreManager.score(req.body))
})

module.exports = app
