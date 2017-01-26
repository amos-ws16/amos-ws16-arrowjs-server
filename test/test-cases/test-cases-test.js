const buster = require('buster')
const request = require('supertest')
const app = require('../../lib')

const logging = require('../../lib/logging.js')
const tokens = require('../../lib/tokens.js')

const testCasesDuc = require('./duc-test-cases.js').testCases
const testCasesFabian = require('./fabian-test-cases').testCases
const testCasesJan = require('./jan-test-cases').testCases
const testCasesSimon = require('./simon-test-cases').testCases
const testCasesYves = require('./yves-test-cases').testCases

buster.testCase('Automated Test Cases', {
  setUp: function (done) {
    this.addRequest = this.stub(logging, 'addRequest')
    this.addRequest.yields('123')
    this.verifyToken = this.stub(tokens, 'verifyToken')
    this.verifyToken.returns(Promise.resolve(0))
    this.timeout = 2500
    done()
  },

  'Ducs test cases should not throw an error': (done) => {
    setTimeout(function () {
      for (let index in testCasesDuc) {
        let testCase = testCasesDuc[index]
        testCase.token = 'mytoken'

        request(app)
          .post('/api/score')
          .send(testCase)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(done((err, res) => {
            buster.refute(err)
          }))
      }
    }, 200)
  },

  'Fabians test cases should not throw an error': (done) => {
    for (let index in testCasesFabian) {
      let testCase = testCasesFabian[index]
      testCase.token = 'mytoken'

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Jans test cases should not throw an error': (done) => {
    for (let index in testCasesJan) {
      let testCase = testCasesJan[index]
      testCase.token = 'mytoken'

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Simons test cases should not throw an error': (done) => {
    for (let index in testCasesSimon) {
      let testCase = testCasesSimon[index]
      testCase.token = 'mytoken'

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  },

  'Yves test cases should not throw an error': (done) => {
    for (let index in testCasesYves) {
      let testCase = testCasesYves[index]
      testCase.token = 'mytoken'

      request(app)
        .post('/api/score')
        .send(testCase)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done((err, res) => {
          buster.refute(err)
        }))
    }
  }
})
