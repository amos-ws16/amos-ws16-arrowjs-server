const buster = require('buster')
const sinon = require('sinon')
const validateToken = require('../lib/validate-token')
const tokens = require('../lib/tokens')

buster.testCase('validateToken', {
  setUp: function () {
    this.req = { config: { token: { secret: 'secret' } }, body: {} }
    this.res = { send: this.stub(), json: this.stub(), status: this.stub() }
    this.res.status.returns(this.res)
    this.next = this.stub()
  },

  'should fail when no token was provided': function () {
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
        buster.assert.calledWith(this.res.json, sinon.match.has('message'))
      })
  },

  'should set response code to forbidden 403 when no token was provided': function () {
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.calledWith(this.res.status, 403)
      })
  },

  'should pass token to verifyToken if it was sent': function () {
    let verifyStub = this.stub(tokens, 'verifyToken').returns(Promise.resolve(null))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.calledWith(verifyStub, 'atoken', 'secret')
      })
  },

  'should call next if token is verified successfully': function () {
    this.stub(tokens, 'verifyToken').returns(Promise.resolve(123))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.called(this.next)
      })
  },

  'should return failure code when validation failed': function () {
    this.stub(tokens, 'verifyToken').returns(Promise.reject('error'))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
        buster.assert.calledWith(this.res.json, sinon.match.has('message'))
      })
  },

  'should not call next when validation failed': function () {
    this.stub(tokens, 'verifyToken').returns(Promise.reject('error'))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.refute.called(this.next)
      })
  },

  'should return error message when validation failed': function () {
    this.stub(tokens, 'verifyToken').returns(Promise.reject('error'))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.calledWith(this.res.json, sinon.match.has('message', sinon.match(/[iI]nvalid [tT]oken/)))
      })
  },

  'should save decoded token in request object': function () {
    this.stub(tokens, 'verifyToken').returns(Promise.resolve(123))

    this.req.body = { token: 'atoken' }
    return validateToken(this.req, this.res, this.next)
      .then(() => {
        buster.assert.equals(this.req.userId, 123)
      })
  }
})
