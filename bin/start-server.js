'use strict'

const server = require('../lib/server')
const ScoreManager = require('../lib/score-manager')
const aggregator = require('../lib/score-aggregator')
const sameTitlePlugin = require('../lib/plugins/same-title-plugin')

const port = process.env.PORT || 3000

let manager = new ScoreManager(new aggregator.Mean())
manager.registerPlugin('same-title', sameTitlePlugin)
server.setScoreManager(manager)

server.listen(port, () => {
  console.log(`Server started on Port: ${port}`)
})

