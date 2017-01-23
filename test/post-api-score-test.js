const buster = require('buster')
const VError = require('verror').VError
const postApiScore = require('../lib/post-api-score')
const scoreManager = require('arrow')
const config = require('arrow/config/default')
const InvalidInputError = require('arrow/lib/invalid-input-error')

const sinon = require('sinon')
const logging = require('../lib/logging.js')

buster.testCase('postApiScore', {
  setUp: function (done) {
    this.fakeScoreManager = { score: this.stub() }
    this.create = this.stub(scoreManager, 'create').returns(this.fakeScoreManager)
    this.addRequest = this.stub(logging, 'addRequest')
    this.addRequest.yields('123')

    this.timeout = 2500
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
    done()
  },
  tearDown: function (done) {
    done()
  },
  'should use scoreManager\'s create function': function () {
    postApiScore(this.req, this.res)
    buster.assert.called(this.create)
  },

  'should pass default config when request has no config': function () {
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.create, config)
  },

  'should pass request config when available': function () {
    this.req.body.config = {}
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.create, {})
  },

  /* 'should return failure code on empty request': function (done) {
    this.req.body.config = {}
    this.fakeScoreManager.score.returns('my result')
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
      buster.assert.calledWith(this.res.json, sinon.match.has('message'))
      done()
    })
  }, */

  'should wrap result in object with success flag set to true': function (done) {
    this.fakeScoreManager.score.returns('my result')
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
      buster.assert.calledWith(this.res.json, sinon.match.has('result', 'my result'))
      buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
      done()
    })
  },

  'should pass along error message on input error': function (done) {
    this.fakeScoreManager.score.throws(new InvalidInputError('There was a problem'))
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('error', 'There was a problem'))
      buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
      done()
    })
  },

  'should pass along error message on wrapped input error': function (done) {
    this.fakeScoreManager.score.throws(
      new VError(
        new InvalidInputError('There was a specific problem'),
        'There was a general problem'))
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('error', 'There was a general problem: There was a specific problem'))
      buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
      done()
    })
  },

  'should signal an internal server error on error conditions other than input and rethrow exception': function (done) {
    this.fakeScoreManager.score.throws(new Error('There was an internal problem'))
    buster.assert.exception(() => postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('error', 'Internal Server Error'))
      buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
      done()
    }))
  }
})
