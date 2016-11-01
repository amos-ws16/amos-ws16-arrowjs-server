let buster = require('buster')
let request = require('supertest')
let app = require('../web-api/server')

buster.testCase('GET /api/users', {
  'return my favourite array': (done) => {
    let expectedData = ['Hello', 'my', 'REST', 'API']
    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)
        buster.assert.equals(res.body, expectedData)
      }))
  }
})

