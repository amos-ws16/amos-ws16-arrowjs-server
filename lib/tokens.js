const jwt = require('jsonwebtoken')

/**
 * Create a token for this application using the key given in the config.
 */
function createToken (userId, secret, expiresIn) {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: expiresIn }
    jwt.sign({ data: userId }, secret, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}

/**
 * Verify a token using the application's key given in the config.
 */
function verifyToken (token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded.data)
      }
    })
  })
}

module.exports = { createToken, verifyToken }
