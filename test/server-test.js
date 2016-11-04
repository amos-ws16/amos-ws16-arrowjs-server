let buster = require('buster')
let request = require('supertest')
let app = require('../lib/server.js')

buster.testCase('GET /api/welcome', {
  'should return welcome message': (done) => {
    request(app)
      .get('/api/welcome')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert(res.body.message)
        buster.assert.match(res.body.message, /Welcome/)
      }))
  }
})

