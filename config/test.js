const config = {
  token: {
    secret: 'secret',
    expiresIn: '1h'
  },
  database: {
    host: '127.0.0.1',
    port: 27017,
    dbName: 'amos-test'
  },
  adminPassword: 'admin_pw'
}

module.exports = config
