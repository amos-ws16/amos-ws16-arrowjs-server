const tokens = require('./tokens')

/**
 * Middleware that only allows requests with valid tokens to pass to next.
 */
function validateToken (req, res, next) {
  const token = req.body.token
  if (!token) {
    res.status(403).json({ success: false, message: 'No token provided' })
    return Promise.resolve()
  }

  return tokens.verifyToken(token, req.config.token.secret)
    .then((userId) => {
      req.userId = userId
      next()
    })
    .catch(() => {
      res.status(403).json({ success: false, message: 'Invalid token' })
    })
}

module.exports = validateToken
