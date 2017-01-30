const buster = require('buster')
const request = require('supertest')
const config = require('../../config')()
const app = require('../../lib')(config)

buster.testCase('GET /api/welcome', {
  'should return a welcome message': (done) => {
    request(app)
      .get('/api/welcome')
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert.match(res.text, /Welcome/)
      }))
  },

  'should return a link to changelog in message': (done) => {
    request(app)
      .get('/api/welcome')
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert.match(res.text, /Changelog/)
      }))
  },

  'should return a link to user guide': (done) => {
    request(app)
      .get('/api/welcome')
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert.match(res.text, /User Guide/)
      }))
  },

  'should return version': (done) => {
    request(app)
      .get('/api/welcome')
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert.match(res.text, /Version/)
      }))
  }
})

