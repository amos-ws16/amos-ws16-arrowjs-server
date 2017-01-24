const env = process.env
const config = {
  token: {
    secret: env.ARROW_TOKEN_SECRET
  },
  database: {
    host: env.ARROW_DATABASE_HOST,
    port: env.ARROW_DATABASE_PORT,
    user: env.ARROW_DATABASE_USER,
    password: env.ARROW_DATABASE_PASSWORD
  },
  adminPassword: env.ARROW_ADMIN_PASSWORD,
  port: env.ARROW_LISTEN_PORT
}

module.exports = config
