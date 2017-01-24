const User = require('./models/user')
var config = require('../config')

/**
 * Return true if input user (inUser) credentials match the db record (dbUser).
 * @param inUser - object with name and password properties
 * @param dbUser - object with name and password properties
 */
function isInvalidUser (inUser, dbUser) {
  return !dbUser || dbUser.password !== inUser.password
}

/**
 * Return user's id if the user credentials are correct, null otherwise.
 * @param username - the username to check
 * @param password - the password to authenticate username with
 */
function authenticateUser (username, password) {
  if (username === 'admin') {
    return password === config.adminPassword
      ? Promise.resolve(0) : Promise.resolve(null)
  }

  return User.findOne({ name: username }).then((user) => {
    if (isInvalidUser({ name: username, password }, user)) {
      return Promise.resolve(null)
    }
    return Promise.resolve(user._id)
  })
}

module.exports = { authenticateUser }
