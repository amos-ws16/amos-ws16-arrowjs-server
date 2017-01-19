const buster = require('buster')
const request = require('supertest')
const app = require('../lib')

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
  },
  'should return an auth token': (done) => {
    request(app)
      .get('/api/auth')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)

        const message = res.body
        buster.assert(message.success)
        // Any string is fine for now.
        buster.assert.isString(message.token)
      }))
  },
  '//should pass data to score manager': (done) => {
    let blob = {
      file: { title: 'location.png' },
      tasks: [
        { title: 'location' },
        { title: 'something_else' }
      ]
    }
    request(app)
      .post('/api/score')
      .send(blob)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done((err, res) => {
        buster.refute(err)

        let expected = [
          { score: 1.0, scores: { 'same-title': 1.0 } },
          { score: 0.0, scores: { 'same-title': 0.0 } }
        ]

        buster.assert.match(res.body, expected)
      }))
  }
})
