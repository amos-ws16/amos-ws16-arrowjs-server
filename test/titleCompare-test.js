var buster = require('buster')
var tc = require('../lib/titleCompare')

buster.testCase('titleComparer', {
  'compares String and Title': function () {
    var title = 'The Gambler throws his dices.'
    var searchString1 = 'dice'
    var searchString2 = 'Casino'
    buster.assert.equals(tc.TitleCompare.compareTitle(title, searchString1), true)
    buster.assert.equals(tc.TitleCompare.compareTitle(title, searchString2), false)
  }
})
