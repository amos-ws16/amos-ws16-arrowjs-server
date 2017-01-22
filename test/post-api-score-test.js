const buster = require('buster')
const VError = require('verror').VError
const postApiScore = require('../lib/post-api-score')
const scoreManager = require('arrow')
const config = require('arrow/config/default')
const InvalidInputError = require('arrow/lib/invalid-input-error')
// const dbLib = require('../lib/database')
var dbConfig = require('../../db-config.js')
const mongoose = require('mongoose')
const sinon = require('sinon')
// const Request = require('../lib/models/Request')
let initializedBool = false
buster.testCase('postApiScore', {
  setUp: function (done) {
    // this.save = this.stub(Request, 'save')
    // this.save.returns(Promise.resolve(null))
    this.fakeScoreManager = { score: this.stub() }
    this.create = this.stub(scoreManager, 'create').returns(this.fakeScoreManager)
    /* var db = null
    if (process.env.NODE_ENV === 'production') {
      db = dbLib.connect(dbConfig.prod)
    } else {
      db = dbLib.connect(dbConfig.dev)
    }
    db.on('connected', () => {
      console.log('connected')
      done()
    }) */
    // mongoose.Promise = global.Promise
    this.timeout = 2500
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
    if (!initializedBool) {
      const db = process.env.NODE_ENV === 'production' ? dbConfig.prod : dbConfig.dev
      console.log('mongoose.connection.readyState')
      console.log(mongoose.connection.readyState)
      this.dbLink = mongoose.connect(db)
      initializedBool = true
      // this.dbLink.on('connected', () => {
      mongoose.connection.on('open', () => {
        console.log('established connection')
        done()
      })
    } else {
      done()
    }
  },
  tearDown: function (done) {
    // this.dbLink.close()
    /* if (initialized) {
      this.dbLink.disconnect(done())
    } else {
      done()
    } */
    /* this.dbLink.on('disconnected', () => {
      console.log('closed connection')
      done()
    }) */
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
      done()
    })
  },

  'should pass along error message on input error': function (done) {
    this.fakeScoreManager.score.throws(new InvalidInputError('There was a problem'))
    postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('error', 'There was a problem'))
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
      done()
    })
  },

  'should signal an internal server error on error conditions other than input and rethrow exception': function (done) {
    this.fakeScoreManager.score.throws(new Error('There was an internal problem'))
    buster.assert.exception(() => postApiScore(this.req, this.res, () => {
      buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
      buster.assert.calledWith(this.res.json, sinon.match.has('error', 'Internal Server Error'))
      done()
    }))
  }
})
