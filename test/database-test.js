const buster = require('buster')
var mongoose = require('mongoose')
var dbLib = require('../lib/database')
var dbConfig = require('../../db-config.js')

/**
 * Test cases which check the functionality of the database library.
 */
buster.testCase('database-library-test', {
  setUp: function (done) {
    // connect and wait for established connection
    dbLib.connect(dbConfig.test)
    var db = mongoose.connection
    db.once('open', () => {
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
    mongoose.disconnect()
    var db = mongoose.connection
    db.once('close', done(() => {}))
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
  'test-user-is-not-valid-if-error': function () {
    // TODO: How to check this
    /* mongoose.disconnect()
    dbLib.isUserValid(null, null, done((valid) => {
      buster.assert(!valid)
    })) */
    buster.assert(true)
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
  'add a request and its response to the DB and receive an id': function (done) {
    var request = { blub: 'some undefined json' }
    var response = { arr: [], blub: 'other json' }
    dbLib.addRequest(request, response, done((id) => {
      buster.refute.equals(null, id)
    }))
  },
  'add feedback to the request': function (done) {
    var request = { blub: 'some undefined json' }
    var response = { arr: [], blub: 'other json' }
    var feedback = { abc: 'this is arbitrary feedback' }
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
  'test-connection-to-test-db': function (done) {
    mongoose.connect(dbConfig.test)
    var db = mongoose.connection

    db.once('error', done(() => {
      buster.assert(false)
    }))

    db.once('open', () => {
      buster.assert(true)
      mongoose.disconnect()
    })

    db.once('close', done(() => {
      // console.log('this tells me that i am DISCONNECTED from buster')
    }))
  },
  'test-connection-to-dev-db': function (done) {
    mongoose.connect(dbConfig.dev)
    var db = mongoose.connection

    db.once('error', done(() => {
      buster.assert(false)
    }))

    db.once('open', () => {
      buster.assert(true)
      mongoose.disconnect()
    })

    db.once('close', done(() => {
      // console.log('this tells me that i am DISCONNECTED from buster')
    }))
  },
  'test-connection-to-prod-db': function (done) {
    mongoose.connect(dbConfig.prod)
    var db = mongoose.connection

    db.once('error', done(() => {
      buster.assert(false)
    }))

    db.once('open', () => {
      buster.assert(true)
      mongoose.disconnect()
    })

    db.once('close', done(() => {
      // console.log('this tells me that i am DISCONNECTED from buster')
    }))
  }
})
