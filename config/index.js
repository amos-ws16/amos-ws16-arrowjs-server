const ScoreManager = require('../lib/score-manager')
const aggregator = require('../lib/score-aggregator')
const sameTitlePlugin = require('../lib/plugins/same-title-plugin')

/**
 * Returns a new ScoreManager where the default plugins
 * and aggregator are set up.
 */
function makeScoreManager () {
  let manager = new ScoreManager(new aggregator.Mean())
  manager.registerPlugin('same-title', sameTitlePlugin)
  return manager
}

const config = {}
config.scoreManager = makeScoreManager()
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
