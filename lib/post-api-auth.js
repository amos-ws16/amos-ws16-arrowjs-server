const auth = require('./auth')
const tokens = require('./tokens')

/**
 * Handle requests on /api/auth to validate user credentials.
 */
function postApiAuth (req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({
      success: false,
      message: 'No user name and/or password was provided'
    })
    return Promise.resolve()
  }

  const username = req.body.name
  const password = req.body.password

  const config = req.config

  return auth.authenticateUser(username, password, config.adminPassword)
    .then((userId) => {
      if (userId === null) {
        res.json({ success: false, message: 'Invalid credentials' })
        return undefined
      }

      const tokenConfig = config.token
      return tokens.createToken(userId, tokenConfig.secret, tokenConfig.expiresIn)
        .then((tokenString) => {
          res.json({ success: true, token: tokenString })
        })
    })
}

module.exports = postApiAuth
