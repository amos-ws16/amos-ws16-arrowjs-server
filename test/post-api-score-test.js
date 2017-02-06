const buster = require('buster')
const postApiScore = require('../lib/post-api-score')
const scoreManager = require('arrow')
const config = require('arrow/config/default')

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

  'should wrap result in object with success flag set to true': function (done) {
    this.fakeScoreManager.score.returns('my result')
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
      buster.assert.calledWith(this.res.json, sinon.match.has('result', 'my result'))
      buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
      done()
    })
  }
})
