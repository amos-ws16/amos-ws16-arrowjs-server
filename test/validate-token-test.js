const buster = require('buster')
const sinon = require('sinon')
const validateToken = require('../lib/validate-token')
const config = require('../config')

const jwt = require('jsonwebtoken')

buster.testCase('validateToken', {
  setUp: function () {
    this.res = { send: this.stub(), json: this.stub(), status: this.stub() }
    this.res.status.returns(this.res)
    this.next = this.stub()
  },

  'should fail when no token was provided': function () {
    const body = {}
    validateToken({ body }, this.res, this.next)
    buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
    buster.assert.calledWith(this.res.json, sinon.match.has('message'))
  },

  'should set response code to forbidden 403 when no token was provided': function () {
    const body = {}
    validateToken({ body }, this.res, this.next)
    buster.assert.calledWith(this.res.status, 403)
  },

  'should pass token to jwt.verify if it was sent': function () {
    let verifyStub = this.stub(jwt, 'verify')

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)
    buster.assert.calledWith(verifyStub, 'atoken', config.token.secret)
  },

  'should call next if token is verified successfully': function () {
    this.stub(jwt, 'verify').yields(null, 'decoded-token')

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)
    buster.assert.called(this.next)
  },

  'should return failure code when validation failed': function () {
    this.stub(jwt, 'verify').yields('error', null)

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)
    buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
    buster.assert.calledWith(this.res.json, sinon.match.has('message'))
  },

  'should not call next when validation failed': function () {
    this.stub(jwt, 'verify').yields('error', null)

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)
    buster.refute.called(this.next)
  },

  'should return error message when validation failed': function () {
    this.stub(jwt, 'verify').yields('error', null)

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)
    buster.assert.calledWith(this.res.json, sinon.match.has('message', sinon.match(/[iI]nvalid [tT]oken/)))
  },

  'should save decoded token in request object': function () {
    this.stub(jwt, 'verify').yields(null, 'decoded-token')

    const body = { token: 'atoken' }
    let req = { body }
    validateToken(req, this.res, this.next)

    buster.assert.equals(req.decoded, 'decoded-token')
  }
})
