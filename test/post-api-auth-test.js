const buster = require('buster')
const sinon = require('sinon')
const postApiAuth = require('../lib/post-api-auth')

// Classes to be stubbed
const auth = require('../lib/auth')
const tokens = require('../lib/tokens')

buster.testCase('postApiAuth', {
  setUp: function () {
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
  },

  'invalid input': {
    'should return failure code on empty request': function () {
      return postApiAuth(this.req, this.res)
        .then(() => {
          buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
          buster.assert.calledWith(this.res.json, sinon.match.has('message'))
        })
    },

    'should return failure code if password is missing': function () {
      this.req.body = { name: 'bob' }
      return postApiAuth(this.req, this.res)
        .then(() => {
          buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
          buster.assert.calledWith(this.res.json, sinon.match.has('message'))
        })
    },

    'should return failure code if username is missing': function () {
      this.req.body = { password: 'secret' }
      return postApiAuth(this.req, this.res)
        .then(() => {
          buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
          buster.assert.calledWith(this.res.json, sinon.match.has('message'))
        })
    },

    'should return failure code if username and password cannot be authenticated': function () {
      this.req.body = { name: 'bob', password: 'secret' }
      this.stub(auth, 'authenticateUser').returns(Promise.resolve(null))
      return postApiAuth(this.req, this.res)
        .then(() => {
          buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
          buster.assert.calledWith(this.res.json, sinon.match.has('message'))
        })
    }
  },

  'should pass the userId as data to token creation': function () {
    this.req.body = { name: 'bob', password: 'secret' }
    this.stub(auth, 'authenticateUser').returns(Promise.resolve(42))
    const createToken = this.stub(tokens, 'createToken').returns(Promise.resolve(null))
    return postApiAuth(this.req, this.res)
      .then(() => {
        buster.assert.calledWith(createToken, 42)
      })
  },

  'should return token in response': function () {
    this.req.body = { name: 'bob', password: 'secret' }
    this.stub(auth, 'authenticateUser').returns(Promise.resolve(42))
    this.stub(tokens, 'createToken').returns(Promise.resolve('1234'))
    return postApiAuth(this.req, this.res)
      .then(() => {
        buster.assert.calledWith(this.res.json, sinon.match.has('token', '1234'))
      })
  }
})
