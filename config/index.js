const ScoreManager = require('../lib/score-manager')
const aggregator = require('../lib/score-aggregator')
const closeTimePlugin = require('../lib/plugins/close-time-plugin')
const similarTitlePlugin = require('../lib/plugins/similar-title-plugin')

/**
 * Returns a new ScoreManager where the default plugins
 * and aggregator are set up.
 */
function makeScoreManager () {
  let config = {
    aggregator: new aggregator.Mean(),
    plugins: {
      'similar-title': {
        score: similarTitlePlugin,
        inputs: ['file', 'tasks[]']
      },
      'close-time': {
        score: closeTimePlugin,
        inputs: ['file', 'tasks[]']
      }
    }
  }
  let manager = new ScoreManager(config)
  return manager
}

const config = {}
config.scoreManager = makeScoreManager()
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
