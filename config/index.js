const aggregator = require('../lib/score-aggregator')

const config = {}

config.scoreManager = {
  aggregator: new aggregator.Mean(),
  plugins: {
    'similar-title': {
      use: 'similar-title-plugin',
      inputs: ['file', 'tasks[]']
    },
    'context-file-timestamp-tasks-timestamp': {
      use: 'similar-context-plugin',
      inputs: ['file.created_at', 'tasks[].created_at']
    },
    'context-file-timestamp-tasks-timestamp-long': {
      use: 'similar-context-plugin',
      inputs: ['file.created_at', 'tasks[].created_at'],
      params: { 'time-limit': 3000 }
    }
  }
}
config.secretToken = '8cd96c8697d12daf4dfd135aec01fd63ee058ab4'

module.exports = config
