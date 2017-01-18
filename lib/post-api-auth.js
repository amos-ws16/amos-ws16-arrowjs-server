const jwt = require('jsonwebtoken')
const User = require('./models/user')
const config = require('../config')

/**
 * Handle requests on /api/auth to validate user credentials.
 */
function postApiAuth (req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({
      success: false,
      message: 'No user name and/or password was provided'
    })
    return
  }

  const user = req.body.name
  const password = req.body.password

  User.findOne({ name: user }, (err, user) => {
    if (err) {
      res.json({ success: false, message: 'Error while processing request' })
      return
    }
    if (!user || user.password !== password) {
      res.json({ success: false, message: 'Invalid user name or password' })
      return
    }

    const token = jwt.sign(user, config.token.secret,
      { expiresInMinutes: config.token.expiresInMinutes })

    res.json({ success: true, token })
  })
}

module.exports = postApiAuth
