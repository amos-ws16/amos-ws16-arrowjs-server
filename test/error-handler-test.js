const buster = require('buster')
const sinon = require('sinon')

const errorHandler = require('../lib/error-handler')

buster.testCase('errorHandler', {
  setUp: function () {
    this.syntaxError = new SyntaxError('Blablubb')
    this.genericError = new Error('Generic Failure')
    this.req = null
    this.res = { json: this.stub() }
  },

  'should send error message when error is a SyntaxError': function (done) {
    errorHandler(this.syntaxError, this.req, this.res, () => {
      buster.assert.calledWith(this.res.json,
        sinon.match({ success: false, message: sinon.match(/SyntaxError/) }))
      done()
    })
  },

  'should call next with error if error is not a SyntaxError': function (done) {
    errorHandler(this.genericError, this.req, this.res, (passedError) => {
      buster.assert.same(passedError, this.genericError)
      done()
    })
  },

  'should not send any output if error is not a SyntaxError': function (done) {
    errorHandler(this.genericError, this.req, this.res, () => {
      buster.refute.called(this.res.json)
      done()
    })
  }
})
