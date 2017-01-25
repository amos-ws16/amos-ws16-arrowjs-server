const buster = require('buster')
const request = require('supertest')
const mongoose = require('mongoose')

const config = require('../../config')
const app = require('../../lib')
const generateDatabaseUri = require('../../lib/database').generateUri

mongoose.Promise = global.Promise

buster.testCase('E2E: Authentication', {
  setUp: function (done) {
    this.requestWithoutToken = {
      file: { title: 'Locations', description: 'Beautiful location for a meeting' },
      tasks: [
        { title: 'Pick a location' },
        { title: 'Do the laundry', description: 'It is very dirty at certain locations' },
        { title: 'Find out about testing databases' }
      ]
    }

    this.dbLink = mongoose.createConnection(generateDatabaseUri(config.database))
    this.dbLink.once('open', () => {
      done()
    })
  },
  tearDown: function (done) {
    this.dbLink.close()
    this.dbLink.once('close', () => {
      done()
    })
  },

  'should respond with valid token when given correct username and password': function () {
    return request(app)
      .post('/api/auth')
      .send({ name: 'admin', password: config.adminPassword })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const body = res.body
        buster.assert.isTrue(body.success)

        const token = body.token
        buster.assert.isString(token)
        buster.assert.greater(token.length, 0)
        const requestWithToken = Object.assign({ token }, this.requestWithoutToken)
        return request(app)
          .post('/api/score')
          .send(requestWithToken)
          .expect('Content-Type', /json/)
          .expect(200)
      })
      .then(res => {
        buster.assert.isTrue(res.body.success)
      })
  },

  'should return forbidden code when trying to access route without token': function () {
    return request(app)
      .post('/api/score')
      .send(this.requestWithoutToken)
      .expect('Content-Type', /json/)
      .expect(403)
      .then(res => {
        buster.assert.isFalse(res.body.success)
      })
  },

  'should return forbidden code when trying to login with wrong password': function () {
    process.env.ARROW_ADMIN_PASSWORD = '1234'
    return request(app)
      .post('/api/score')
      .send({ name: 'admin', password: 'wrong' })
      .expect('Content-Type', /json/)
      .expect(403)
      .then(res => {
        buster.assert.isFalse(res.body.success)
      })
  }
})
