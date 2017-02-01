const buster = require('buster')
const request = require('supertest')
const mongoose = require('mongoose')

const makeConfig = require('../../config')
const makeApp = require('../../lib')
const generateDatabaseUri = require('../../lib/database').generateUri
const User = require('../../lib/models/user')

mongoose.Promise = global.Promise

/** Provision the database with two users */
function setUpUsers () {
  return User.remove({})
    .then(() => {
      User.create([
        { name: 'alice', password: 'alicepw', isAdmin: true },
        { name: 'bob', password: 'bobpw', isAdmin: false }
      ])
    })
}

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

    // FIXME: somehow the test runner does not correctly set NODE_ENV to test
    process.env.NODE_ENV = 'test'

    this.config = makeConfig()

    mongoose.connect(generateDatabaseUri(this.config.database))
      .then(() => {
        return setUpUsers()
      })
      .then(() => done())
  },
  tearDown: function (done) {
    mongoose.connection.close(done)
  },

  'should respond with valid token when given correct username and password': function () {
    this.config.adminPassword = 'adminPassword'
    const app = makeApp(this.config)
    return request(app)
      .post('/api/auth')
      .send({ name: 'admin', password: 'adminPassword' })
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

  'should allow username and password saved in database': function () {
    const app = makeApp(this.config)
    return request(app)
      .post('/api/auth')
      .send({ name: 'alice', password: 'alicepw' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        const body = res.body
        buster.assert.isTrue(body.success)

        const token = body.token
        buster.assert.isString(token)
        buster.assert.greater(token.length, 0)
      })
  },

  'should return forbidden code when trying to access route without token': function () {
    const app = makeApp(this.config)
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
    this.config.adminPassword = '1234'
    const app = makeApp(this.config)
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
