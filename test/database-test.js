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
  tearDown: function () {
    mongoose.disconnect()
  },
  'user-exists': function (done) {
    dbLib.findUser('realuser', 'secret', done((err, doc) => {
      if (err) {
        console.log(err)
        buster.assert(false)
      }
      buster.assert.defined(doc)
    }))
  },
  'user-does-not-exist': function (done) {
    dbLib.findUser('nouser', 'doesnt matter', done((err, doc) => {
      if (err) {
        console.log(err)
        buster.assert(false)
      }
      buster.assert.isNull(doc)
    }))
  }
})

/**
 * Test cases which check the connection to the databases
 */
buster.testCase('database-connection-test', {
  'test-connection-to-dev-db': function (done) {
    mongoose.connect(dbConfig.dev)
    var db = mongoose.connection

    db.on('error', done(() => {
      buster.assert(false)
    }))

    db.once('open', done(() => {
      buster.assert(true)
      mongoose.disconnect()
    }))
  },
  'test-connection-to-prod-db': function (done) {
    mongoose.connect(dbConfig.prod)
    var db = mongoose.connection

    db.on('error', done(() => {
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
  'test-connection-to-test-db': function (done) {
    mongoose.connect(dbConfig.test)
    var db = mongoose.connection

    db.on('error', done(() => {
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
