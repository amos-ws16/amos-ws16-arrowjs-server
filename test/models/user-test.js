const buster = require('buster')

const User = require('../../lib/models/user')

buster.testCase('User model', {
  'should be invalid if name is missing': function (done) {
    let user = new User()
    user.validate((err) => {
      buster.refute.isNull(err, 'Error must be set')
      buster.assert.defined(err.errors.name)
      done()
    })
  },

  'should be invalid if password is missing': function (done) {
    let user = new User({ name: 'alice' })
    user.validate((err) => {
      buster.refute.isNull(err, 'Error must be set')
      buster.assert.defined(err.errors.password)
      done()
    })
  },

  'should be valid if username and password are available': function (done) {
    let user = new User({ name: 'alice', password: '123' })
    user.validate((err) => {
      buster.assert.isNull(err)
      done()
    })
  },

  'should be valid if username, password and isAdmin are given': function (done) {
    let user = new User({ name: 'alice', password: '123', isAdmin: true })
    user.validate((err) => {
      buster.assert.isNull(err)
      done()
    })
  }
})
