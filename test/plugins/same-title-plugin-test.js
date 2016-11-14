const buster = require('buster')
const plugin = require('../../lib/plugins/same-title-plugin.js')

buster.testCase('sameTitlePlugin', {
  'should return 1.0 when there is a total match': function () {
    let file = { title: 'location.jpeg' }
    let task = { title: 'location' }

    let result = plugin(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 when there is no match at all': function () {
    let file = { title: 'no_match.jpeg' }
    let task = { title: 'location' }

    let result = plugin(file, task)
    buster.assert.equals(result, 0.0)
  },

  'should return 1.0 when there is a total match ignoring the file extension': function () {
    let file = { title: 'location.png' }
    let task = { title: 'location' }

    let result = plugin(file, task)
    buster.assert.equals(result, 1.0)
  }
})
