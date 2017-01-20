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

  return auth.authenticateUser(username, password)
    .then((userId) => {
      if (userId === null) {
        res.json({ success: false, message: 'Invalid credentials' })
        return undefined
      }

      tokens.createToken(userId).then((tokenString) => {
        res.json({ success: true, tokenString })
      })
    })
}

module.exports = postApiAuth
