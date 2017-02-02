const buster = require('buster')

const logging = require('../lib/logging.js')
const sinon = require('sinon')
const Request = require('../lib/models/request')
const packageInfoServer = require('../package.json')
const packageInfoEngine = require('../node_modules/arrow/package.json')

buster.testCase('request-database test', {
  setUp: function (done) {
    // this.save = sinon.stub(mongoose.Model.prototype, 'save')// Request.prototype, 'save')// this.stub(logging.addRequest.newRequest.save)
    this.create = this.stub(Request, 'create')
    done()
  },

  'should call save function once': function () {
    logging.addRequest({}, {}, () => {})
    buster.assert.called(this.create)
  },

  'Should test, whether the right request and response gets saved': function () {
    logging.addRequest('sample Request', 'sample Response', () => {})
    buster.assert.calledWith(this.create, sinon.match.has('request', 'sample Request'))
    buster.assert.calledWith(this.create, sinon.match.has('response', 'sample Response'))
  },

  'Should test, whether the right versions in the meta-information get saved': function () {
    logging.addRequest('sample Request', 'sample Response', () => {})
    buster.assert.calledWith(this.create, sinon.match.has(
      'metaInfo', sinon.match.has('serverVersion', packageInfoServer.version))
    )
    buster.assert.calledWith(this.create, sinon.match.has(
      'metaInfo', sinon.match.has('engineVersion', packageInfoEngine.version))
    )
  },

  'Should test, whether a timestamp gets saved': function () {
    logging.addRequest('sample Request', 'sample Response', () => {})
    buster.assert.calledWith(this.create, sinon.match.has(
      'metaInfo', sinon.match.has('timestamp', sinon.match.number))
    )
  }
})
