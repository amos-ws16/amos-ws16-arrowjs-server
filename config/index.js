const aggregator = require('../lib/score-aggregator')
const closeTimestampPlugin = require('../lib/plugins/close-timestamp-plugin')
const similarTitlePlugin = require('../lib/plugins/similar-title-plugin')

const config = {}

config.scoreManager = {
  aggregator: new aggregator.Mean(),
  plugins: {
    'similar-title': {
      use: similarTitlePlugin,
      inputs: ['file', 'tasks[]']
    },
    'close-time': {
      use: closeTimestampPlugin,
      inputs: ['file.timestamp', 'tasks[].timestamp']
    }
  }
}
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
