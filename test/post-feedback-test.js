const buster = require('buster')
// const InvalidInputError = require('arrow/lib/invalid-input-error')

// const feedback = require('../lib/feedback')
const postApiFeedback = require('../lib/post-api-feedback')
const sinon = require('sinon')
const Request = require('../lib/models/request')

buster.testCase('postApiFeedback', {
  setUp: function (done) {
    this.create = this.stub(Request, 'create')
    this.addFeedback = this.stub(Request, 'findByIdAndUpdate')
    this.timeout = 2500
    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
    done()
  },
  'No input': {
    'should return failure code on empty request': function (done) {
      postApiFeedback(this.req, this.res, () => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
        buster.assert.calledWith(this.res.json, sinon.match.has('err', 'Wrong input. Use case id and/or candidate id is missing.'))
        done()
      })
    }
  },
  'Wrong input': {
    'should return failure code on wrong request': function (done) {
      this.req.body = { uid: '123', cid: 123 }
      postApiFeedback(this.req, this.res, () => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
        buster.assert.calledWith(this.res.json, sinon.match.has('err', 'Candidate id has to be a string'))
        done()
      })
    }
  },
  'Uid not in database': {
    'should return failure code on wrong request': function (done) {
      this.req.body = { uid: '123', cid: '123' }
      this.addFeedback.yields('err')
      postApiFeedback(this.req, this.res, () => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
        buster.assert.calledWith(this.res.json, sinon.match.has('err', 'Uid was not found in database.'))
        done()
      })
    }
  },
  'Valid input': {
    'should return success and the searched request with the given uid and cid': function (done) {
      this.req.body = { uid: '123', cid: '123' }
      this.addFeedback.yields(null, 'doc')
      postApiFeedback(this.req, this.res, () => {
        buster.assert.calledWith(this.res.json, sinon.match.has('success', true))
        done()
      })
    }
  }
})
