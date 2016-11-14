'use strict'

const server = require('../lib/server')
const ScoreManager = require('../lib/score-manager')
const ScoreCombiner = require('../lib/score-combiner')
const sameTitlePlugin = require('../lib/plugins/same-title-plugin')

const port = process.env.PORT || 3000

let manager = new ScoreManager(new ScoreCombiner.Mean())
manager.registerPlugin('same-title', sameTitlePlugin)
server.setScoreManager(manager)

server.listen(port, () => {
  console.log(`Server started on Port: ${port}`)
})

