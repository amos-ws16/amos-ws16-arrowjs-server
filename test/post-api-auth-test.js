const buster = require('buster')
const sinon = require('sinon')
const postApiAuth = require('../lib/post-api-auth')

const config = require('../config')

// Classes to be stubbed
const User = require('../lib/models/user')
const jwt = require('jsonwebtoken')

buster.testCase('postApiAuth', {
  setUp: function () {
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
  },

  'invalid input': {
    'should return failure code on empty request': function () {
      postApiAuth(this.req, this.res)
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('message'))
    },

    'should return failure code when user does not exist': function () {
      this.stub(User, 'findOne').yields(null, null)
      const body = { name: 'idontexist', password: 'crucifix' }
      postApiAuth({ body }, this.res)
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('message'))
    },

    'should return failure code when password was not provided': function () {
      this.stub(User, 'findOne').yields(null, null)
      const body = { name: 'mrpasswordless' }
      postApiAuth({ body }, this.res)
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('message'))
    },

    'should return failure code when username and password do not match the db record': function () {
      this.stub(User, 'findOne').yields(null, { name: 'bob', password: 'crucifix' })
      const body = { name: 'bob', password: 'wrong' }
      postApiAuth({ body }, this.res)
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('message'))
    }
  },

  'should catch db error': function () {
    this.stub(User, 'findOne').yields('error occured', null)
    const body = { name: 'bob', password: 'crucifix' }
    postApiAuth({ body }, this.res)
    buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
    buster.assert.calledWith(this.res.json, sinon.match.has('message'))
  },

  'valid input': {
    'should pass username to model': function () {
      let userStub = this.stub(User, 'findOne')

      const body = { name: 'bob', password: 'crucifix' }
      postApiAuth({ body }, this.res)

      buster.assert.calledWith(userStub, { name: 'bob' })
    },

    'should succeed when username and password match db record': function () {
      this.stub(User, 'findOne').yields(null, { name: 'bob', password: 'crucifix' })
      this.stub(jwt, 'sign')

      const body = { name: 'bob', password: 'crucifix' }
      postApiAuth({ body }, this.res)

      buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
    },

    'should call json web token to generate token': function () {
      this.stub(User, 'findOne').yields(null, { name: 'bob', password: 'crucifix' })
      let signStub = this.stub(jwt, 'sign')

      const body = { name: 'bob', password: 'crucifix' }
      postApiAuth({ body }, this.res)

      buster.assert.calledWith(signStub, body, config.token.secret, { expiresInMinutes: config.token.expiresInMinutes })
    }
  }
})
