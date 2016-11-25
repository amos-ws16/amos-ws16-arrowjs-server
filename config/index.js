const aggregator = require('../lib/score-aggregator')

const config = {}

config.scoreManager = {
  aggregator: new aggregator.Mean(),
  plugins: {
    'similar-title': {
      use: 'similar-title-plugin',
      inputs: ['file', 'tasks[]']
    },
    'close-time': {
      use: 'close-timestamp-plugin',
      inputs: ['file.created_at', 'tasks[].created_at'],
      params: { 'time-limit': 1234 }
    }
  }
}
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
