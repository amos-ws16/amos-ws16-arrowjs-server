const jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * Middleware that only allows requests with valid tokens to pass to next.
 */
function validateToken (req, res, next) {
  const token = req.body.token
  if (!token) {
    res.status(403).json({ success: false, message: 'No token provided' })
    return
  }

  jwt.verify(token, config.token.secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ success: false, message: 'Invalid token' })
      return
    }

    req.decoded = decoded
    next()
  })
}

module.exports = validateToken
