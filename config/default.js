const env = process.env
const config = {
  token: {
    secret: env.ARROW_TOKEN_SECRET,
    expiresIn: '24h'
  },
  database: {
    host: 'localhost',
    port: 27017,
    dbName: 'arrow',
    user: '',
    password: ''
  },
  adminPassword: env.ARROW_ADMIN_PASSWORD,
  port: env.ARROW_LISTEN_PORT || 3000
}

module.exports = config

