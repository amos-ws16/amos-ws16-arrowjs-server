const config = {}

config.token = {
  secret: '8cd96c8697d12daf4dfd135aec01fd63ee058ab4',
  expiresInMinutes: 1440 // 24 hours
}

config.database = 'mongodb://127.0.0.1:27017/token'

module.exports = config
