const buster = require('buster')
const titleContextScorer = require('../lib/titleContextScorer')

buster.testCase('Title Context Score Test', {
  'should return 1.0 when title and task matches exactly': function () {
    const input = { upload: {title: 'testcase'},
      tasks: [ {title: 'testcase'} ] }
    let result = titleContextScorer.getScore(input)
    buster.assert.equals(result, [ { title: 'testcase', score: 1 } ])
  },

  'should return 0.725 when title and task are compared': function () {
    const input = { upload: {title: 'Olive-green table for sale, in extremely good condition'},
      tasks: [ {title: 'For sale: table in very good  condition, olive green in colour'} ] }
    let result = titleContextScorer.getScore(input)
    buster.assert.equals(result, [ { title: 'For sale: table in very good  condition, olive green in colour', score: 0.725 } ])
  },

  'should return 0.30556 for the first task and 0.0.11594 for the second, when title and task are compared': function () {
    const input = { upload: {title: 'Olive-green table for sale, in extremely good condition'},
      tasks: [ {title: 'For sale: green Subaru Impreza, 210,000 miles'},
      {title: 'Wanted: mountain bike with at least 21 gears'} ] }
    let result = titleContextScorer.getScore(input)
    buster.assert.equals(result, [ { title: 'For sale: green Subaru Impreza, 210,000 miles', score: 0.30556 },
    { title: 'Wanted: mountain bike with at least 21 gears', score: 0.11594 } ])
  }
})
