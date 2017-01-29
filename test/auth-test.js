const buster = require('buster')

const auth = require('../lib/auth')
const User = require('../lib/models/user')
const config = require('../config')()

buster.testCase('auth', {
  setUp: function () {
    this.findOne = this.stub(User, 'findOne')
    this.findOne.returns(Promise.resolve(null))
    this.originalAdminPw = process.env.ARROW_ADMIN_PASSWORD
    process.env.ARROW_ADMIN_PASSWORD = 'admin password'
  },
  tearDown: function () {
    process.env.ARROW_ADMIN_PASSWORD = this.originalAdminPw
  },

  'should return null when username was not found in database': function () {
    return auth.authenticateUser('username', 'password').then((userId) => {
      buster.assert.isNull(userId)
    })
  },

  'should call User model with provided username': function () {
    return auth.authenticateUser('username', 'password').then(() => {
      buster.assert.calledWith(this.findOne, { name: 'username' })
    })
  },

  'should return the userId when username and password match the database record': function () {
    this.findOne.returns(Promise.resolve({ _id: 123, name: 'username', password: 'password' }))
    return auth.authenticateUser('username', 'password').then((userId) => {
      buster.assert.same(userId, 123)
    })
  },

  'should return null when username was found but password does not match the database record': function () {
    this.findOne.returns(Promise.resolve({ _id: 123, name: 'username', password: 'password' }))
    return auth.authenticateUser('username', 'wrong password').then((userId) => {
      buster.assert.isNull(userId)
    })
  },

  'should return userId = 0 when username is admin and password matches ARROW_ADMIN_PASSWORD environment variable': function () {
    return auth.authenticateUser('admin', config.adminPassword).then((userId) => {
      buster.assert.same(userId, 0)
    })
  },

  'should return null when username is admin and password does not match ARROW_ADMIN_PASSWORD environment variable': function () {
    return auth.authenticateUser('admin', 'not the admin password').then((userId) => {
      buster.assert.isNull(userId)
    })
  },

  'should reject when user model fails': function (done) {
    this.findOne.returns(Promise.reject(new Error('something went wrong')))
    return auth.authenticateUser('username', 'password').catch((err) => {
      buster.assert(err)
      done()
    })
  }
})
