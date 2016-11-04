var buster = require('buster')
var myLib = require('../lib/mylib')

buster.testCase('A module', {
  'states the obvious': function () {
    buster.assert(myLib.wisdom)
  }
})

// Showcase an asynchronous test.
buster.testCase('ComplicatedAsyncTask', {
  'should return 42': async () => {
    buster.assert.same(await myLib.complicatedAsyncTask(), 42)
  }
})
