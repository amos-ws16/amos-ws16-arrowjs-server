const buster = require('buster')
const proxyquire = require('proxyquire')

// Stub out config files for /config/index.js.
const config = proxyquire('../config', {
  './default': { a: 'default', b: 'default' },
  './development': { a: 'development' },
  './test': { a: 'test', b: 'test' },
  './production': { b: 'production' }
})

buster.testCase('Config loader', {
  'should load development config when node_env was not set': function () {
    process.env.NODE_ENV = ''

    buster.assert.match(config(), { a: 'development', b: 'default' })
  },

  'should load test config when node_env was set to \'test\'': function () {
    process.env.NODE_ENV = 'test'

    buster.assert.match(config(), { a: 'test', b: 'test' })
  },

  'should load development config when node_env was set to \'development\'': function () {
    process.env.NODE_ENV = 'development'

    buster.assert.match(config(), { a: 'development', b: 'default' })
  },

  'should load production config when node_env was set to \'production\'': function () {
    process.env.NODE_ENV = 'production'

    buster.assert.match(config(), { a: 'default', b: 'production' })
  }
})
