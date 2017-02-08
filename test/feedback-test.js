const buster = require('buster')

const feedback = require('../lib/feedback')
const Request = require('../lib/models/request')

buster.testCase('request-database test', {
  setUp: function (done) {
    this.create = this.stub(Request, 'create')
    done()
  },

  'should call callback with an error when database returns an error': function (done) {
    this.stub(Request, 'findByIdAndUpdate').yields('error', null)
    const reqid = 1
    const f = {}
    feedback.addFeedback(reqid, f, (err) => {
      buster.assert(err)
      done()
    })
  },

  'should call the database with the given requestId': function (done) {
    const findByIdAndUpdate = this.stub(Request, 'findByIdAndUpdate').yields()
    const reqid = 1
    const f = {}
    feedback.addFeedback(reqid, f, () => {
      buster.assert.calledWith(findByIdAndUpdate)
      done()
    })
  },
  'should return a document if the given requestId is valid and there is a feedback': function (done) {
    const findByIdAndUpdate = this.stub(Request, 'findByIdAndUpdate').yields('doc')
    const reqid = 1
    const f = 'id'
    feedback.addFeedback(reqid, f, (doc) => {
      buster.assert.calledWith(findByIdAndUpdate)
      done()
    })
  }
})
