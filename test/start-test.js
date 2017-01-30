const buster = require('buster')
const sinon = require('sinon')

const makeApp = require('../lib')

const http = require('http')
const database = require('../lib/database')

buster.testCase('app.start()', {
  setUp: function () {
    this.config = {
      database: 'database config',
      port: 1234
    }
    this.connect = this.stub(database, 'connect').returns(Promise.resolve())
    this.listen = this.stub().yields()
    this.stub(http, 'createServer').returns({ listen: this.listen })
    this.log = this.stub(console, 'log')
  },

  'should connect to the database with credentials given in the config': function () {
    const app = makeApp(this.config)
    return app.start()
      .then(() => {
        buster.assert.calledWith(this.connect, 'database config')
      })
  },

  'should listen on the port given in the config': function () {
    const app = makeApp(this.config)
    return app.start()
      .then(() => {
        buster.assert.calledWith(this.listen, 1234)
      })
  },

  'should give a log message with mode and port': function () {
    const app = makeApp(this.config)
    return app.start()
      .then(() => {
        buster.assert.calledWith(this.log, sinon.match(/1234/))
        buster.assert.calledWith(this.log, sinon.match(/test mode/))
      })
  }
})
