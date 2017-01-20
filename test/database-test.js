const buster = require('buster')
var mongoose = require('mongoose')
var dbLib = require('../lib/database')
var dbConfig = require('../../db-config.js')

var db = null

/**
 * Test cases which check the functionality of the database library.
 */
buster.testCase('database-library-test', {
  setUp: function (done) {
    // connect and wait for established connection
    db = dbLib.connect(dbConfig.test)
    db.on('connected', () => {
      // delete users database
      dbLib.model.User.remove({}, (err) => {
        if (err) {
          console.log(err)
        }
        // add user (realuser, secret)
        var newUser = new dbLib.model.User({ name: 'realuser', password: 'secret' })
        newUser.save(done((err) => {
          if (err) {
            console.log(err)
          }
        }))
      })
    })
  },
  tearDown: function (done) {
    db.close()
    db.on('disconnected', done(() => {}))
  },
  'test-user-is-valid': function (done) {
    dbLib.isUserValid('realuser', 'secret', done((valid) => {
      buster.assert(valid)
    }))
  },
  'test-user-is-not-valid': function (done) {
    dbLib.isUserValid('nouser', 'secret', done((valid) => {
      buster.assert(!valid)
    }))
  },
  'create new token for authentication': function (done) {
    dbLib.createToken('abcdefg', done((created) => {
      buster.assert(created)
    }))
  },
  'check valid token check': function (done) {
    var tokenId = '123asd123'
    dbLib.createToken(tokenId, () => {
      dbLib.isTokenValid(tokenId, done((valid) => {
        buster.assert(valid)
      }))
    })
  },
  'check invalid token': function (done) {
    var neverUsedTokenId = 'blub'
    dbLib.isTokenValid(neverUsedTokenId, done((valid) => {
      buster.assert(!valid)
    }))
  },
  '// add a request and its response to the DB and receive an id': function (done) {
    // var config = {blub: 'some undefined json'}
    // var file = {blub: 'some undefined json'}
    // var tasks = [{blub: 'some undefined json'}, {blub: 'some undefined json'}]
    var request = {blub: 'some undefined json'}
    var result = {blub: 'some undefined json'}
    console.log('.')
    dbLib.addRequest(request, result, done((id) => {
      buster.refute.equals(null, id)
    }))
  },
  'try to find non-existent request': function (done) {
    var id = '587d91a0bfff306e0cf88dc0'
    dbLib.findRequest(id, done((doc) => {
      buster.assert.equals([], doc)
    }))
  },
  '// add feedback to the request': function (done) {
    // var config = {blub: 'some undefined json'}
    // var file = {blub: 'some undefined json'}
    // var tasks = [{blub: 'some undefined json'}, {blub: 'some undefined json'}]
    var request = {blub: 'some undefined json'}
    var response = {blub: 'some undefined json'}
    var feedback = { abc: 'this is arbitrary feedback' }
    console.log(',')
    dbLib.addRequest(request, response, (id) => {
      dbLib.addFeedback(id, feedback, done((doc) => {
        buster.assert.equals(doc.feedback, feedback)
      }))
    })
  },
  'add feedback to a request that does not exist': function (done) {
    var id = '587d91a0bfff306e0cf88dc0'
    var feedback = { abc: 'this is arbitrary feedback' }
    dbLib.addFeedback(id, feedback, done((doc) => {
      buster.assert.equals(null, doc)
    }))
  }
})

/**
 * Test cases which check the connection to the databases
 */
buster.testCase('database-connection-test', {
  tearDown: function (done) {
    db.close()
    db.on('disconnected', done(() => {}))
  },
  'test-connection-to-test-db': function (done) {
    db = mongoose.createConnection(dbConfig.test)

    db.on('error', done(() => {
      buster.assert(false)
    }))

    db.on('connected', done(() => {
      buster.assert(true)
    }))
  },
  'test-connection-to-dev-db': function (done) {
    db = mongoose.createConnection(dbConfig.dev)

    db.on('error', done(() => {
      buster.assert(false)
    }))

    db.on('connected', done(() => {
      buster.assert(true)
    }))
  },
  'test-connection-to-prod-db': function (done) {
    db = mongoose.createConnection(dbConfig.prod)

    db.on('error', done(() => {
      buster.assert(false)
    }))

    db.on('connected', done(() => {
      buster.assert(true)
    }))
  }
})
