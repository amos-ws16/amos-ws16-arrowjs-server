const jwt = require('jsonwebtoken')
const config = require('../config')()

/**
 * Create a token for this application using the key given in the config.
 */
function createToken (userId) {
  return new Promise((resolve, reject) => {
    const options = { expiresIn: config.token.expiresIn }
    jwt.sign({ data: userId }, config.token.secret, options, (err, token) => {
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
function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.token.secret, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded.data)
      }
    })
  })
}

module.exports = { createToken, verifyToken }
