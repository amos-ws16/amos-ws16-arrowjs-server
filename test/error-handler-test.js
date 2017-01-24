const buster = require('buster')
const sinon = require('sinon')

const errorHandler = require('../lib/error-handler').errorHandler
const addErrorName = require('../lib/error-handler').addErrorName
const InvalidInputError = require('arrow/lib/invalid-input-error')

buster.testCase('errorHandler', {

  setUp: function () {
    this.syntaxError = new SyntaxError('Blablubb')
    this.genericError = new Error('Generic Failure')
    this.invalidInputError = new InvalidInputError('Invalid input error')
  },

  'errorHandler': {
    setUp: function () {
      this.req = null
      this.res = { json: this.stub() }
    },

    'should send error message when error is a SyntaxError': function (done) {
      errorHandler(this.syntaxError, this.req, this.res, () => {
        buster.assert.calledWith(this.res.json,
          sinon.match({ success: false, message: sinon.match(this.syntaxError.message) }))
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
    },

    'should send the error`s message if it is an InvalidInputError': function (done) {
      errorHandler(this.invalidInputError, this.req, this.res, () => {
        buster.assert.calledWith(this.res.json,
          sinon.match({ success: false, message: sinon.match(this.invalidInputError.message) }))
        done()
      })
    },

    'should contain `Configuration Error` in the send response': function (done) {
      errorHandler(this.invalidInputError, this.req, this.res, () => {
        buster.assert.calledWith(this.res.json,
          sinon.match({ success: false, message: sinon.match(/^Configuration Error: /) }))
        done()
      })
    }
  },

  'addErrorName': {
    'should add Configuration Error to the beginning of the message': function () {
      const message = addErrorName(this.invalidInputError)
      buster.assert.match(message, /^Configuration Error: /)
    }
  }
})
