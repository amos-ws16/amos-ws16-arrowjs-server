let buster = require('buster')
let request = require('supertest-as-promised')
let app = require('../lib/server.js')

buster.testCase('GET /api/welcome', {
  'should return welcome message': async () => {
    let res = await request(app)
      .get('/api/welcome')
      .expect('Content-Type', /json/)
      .expect(200)

    buster.assert(res.body.message)
    buster.assert.match(res.body.message, /Welcome/)
  }
})

