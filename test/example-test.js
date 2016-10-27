var buster = require('buster')
var myLib = require('../lib/mylib')

buster.testCase('A module', {
  'states the obvious': function () {
    buster.assert(myLib.wisdom)
  }
})

