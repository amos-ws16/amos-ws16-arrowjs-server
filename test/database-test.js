const buster = require('buster')

const database = require('../lib/database')
const mongoose = require('mongoose')

buster.testCase('database', {
  'generateUri': {
    'should generate mongodb://host:27017/dbname when only hostname and dbname is provided': function () {
      const dbconfig = {
        host: 'myhost',
        dbName: 'the_database'
      }

      const uri = database.generateUri(dbconfig)
      buster.assert.equals(uri, 'mongodb://myhost:27017/the_database')
    },

    'should generate mongodb://host:27017/dbname when only hostname and dbname is provided 2': function () {
      const dbconfig = {
        host: 'my.other.host',
        dbName: 'arrows_data'
      }

      const uri = database.generateUri(dbconfig)
      buster.assert.equals(uri, 'mongodb://my.other.host:27017/arrows_data')
    },

    'should generate mongodb://host:port/dbname when port is provided': function () {
      const dbconfig = {
        host: 'my.other.host',
        dbName: 'arrows_data',
        port: 1234
      }

      const uri = database.generateUri(dbconfig)
      buster.assert.equals(uri, 'mongodb://my.other.host:1234/arrows_data')
    },

    'should generate mongodb://user@host:port/dbname when user is provided': function () {
      const dbconfig = {
        host: 'my.other.host',
        dbName: 'arrows_data',
        user: 'mrsuper'
      }

      const uri = database.generateUri(dbconfig)
      buster.assert.equals(uri, 'mongodb://mrsuper@my.other.host:27017/arrows_data')
    },

    'should generate mongodb://user:password@host:port/dbname when password is provided': function () {
      const dbconfig = {
        host: 'my.other.host',
        dbName: 'arrows_data',
        user: 'mrsuper',
        password: 'super'
      }

      const uri = database.generateUri(dbconfig)
      buster.assert.equals(uri, 'mongodb://mrsuper:super@my.other.host:27017/arrows_data')
    },

    'should throw if password is provided but no user': function () {
      const dbconfig = {
        host: 'my.other.host',
        dbName: 'arrows_data',
        password: 'super'
      }

      buster.assert.exception(() => database.generateUri(dbconfig))
    }
  },

  'connect': {
    setUp: function () {
      this.connectStub = this.stub(mongoose, 'connect')
    },

    'should call mongoose with uri': function () {
      this.connectStub.returns(Promise.resolve())
      return database.connect({ host: 'abc', dbName: 'd' }).then(() => {
        buster.assert.calledWith(this.connectStub, 'mongodb://abc:27017/d')
      })
    },

    'should wait for connection to open and return the same promise': function () {
      this.connectStub.returns(Promise.resolve('special thing'))
      return database.connect({ host: 'abc', dbName: 'd' }).then((something) => {
        buster.assert.equals(something, 'special thing')
      })
    },

    'should reject if there is an error on the connection': function () {
      this.connectStub.returns(Promise.reject('error thing'))
      return database.connect({ host: 'abc', dbName: 'd' }).catch((something) => {
        buster.assert.equals(something, 'error thing')
      })
    }
  }
})
