const buster = require('buster')
const request = require('supertest')
const config = require('../../config')()
const app = require('../../lib')(config)

buster.testCase('POST /api/score', {
  // TODO: needs to be adapted to new API
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

