const buster = require('buster')
// const InvalidInputError = require('arrow/lib/invalid-input-error')

const feedback = require('../lib/feedback')
const postApiFeedback = require('../lib/post-api-feedback')
const sinon = require('sinon')
const Request = require('../lib/models/request')

buster.testCase('postApiFeedback', {
  setUp: function (done) {
    this.create = this.stub(Request, 'create')
    this.addFeedback = this.stub(feedback, 'addFeedback')
    this.addFeedback.yields({uid: '123', cid: '123'})
    this.timeout = 2500
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
    done()
  },
  'No input': {
    'should return failure code on empty request': function () {
      buster.assert.exception(function () {
        postApiFeedback(this.req, this.res)
      }, 'InvalidInputError')
    }
  },
  'Wrong input': {
    'should return failure code on wrong request': function () {
      this.req.body = { uid: '123', cid: 123 }
      buster.assert.exception(function () {
        postApiFeedback(this.req, this.res)
      }, 'InvalidInputError')
    }
  },
  'Uid not in database': {
    'should return failure code on empty request': function () {
      this.req.body = { uid: 'Wrong UID', cid: '123' }
      buster.assert.exception(function () {
        postApiFeedback(this.req, this.res)
      }, 'InvalidInputError')
    }
  },
  'Valid input': {
    'should return success and the searched request with the given uid and cid': function (done) {
      this.req.body = { uid: '123', cid: '123' }
      postApiFeedback(this.req, this.res, () => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
        buster.assert.calledWith(this.res.json, sinon.match.has('uid', '123'))
        buster.assert.calledWith(this.res.json, sinon.match.has('cid', '123'))
        done()
      })
    }
  }
})
