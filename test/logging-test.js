const buster = require('buster')

const logging = require('../lib/logging.js')
// const sinon = require('sinon')
const Request = require('../lib/models/request')
// const mongoose = require('mongoose')

buster.testCase('request-database test', {
  setUp: function (done) {
    // this.save = sinon.stub(mongoose.Model.prototype, 'save')// Request.prototype, 'save')// this.stub(logging.addRequest.newRequest.save)
    this.create = this.stub(Request, 'create')
    done()
  },
  'should call save function once': function () {
    logging.addRequest({}, {}, () => {})
    buster.assert.called(this.create)
  }
})
