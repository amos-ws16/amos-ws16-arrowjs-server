const buster = require('buster')
const scorer = require('../lib/scorer')

buster.testCase('Input Scorer', {
  'should return 1.0 when there is a total match': function () {
    const input = {
      upload: { title: 'location.jpeg' },
      tasks: [{ title: 'location' }]
    }
    let result = scorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', score: 1.0}])
  },

  'should return 0.0 when there is no match at all': function () {
    const input = {
      upload: { title: 'no_match.jpeg' },
      tasks: [{ title: 'location' }]
    }
    let result = scorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', score: 0.0}])
  },

  'should return 1.0 when there is a total match: 2': function () {
    const input = {
      upload: { title: 'location.png' },
      tasks: [{ title: 'location' }]
    }
    let result = scorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', score: 1.0}])
  },

  'should return an array with tasks and their scoring': function () {
    const input = {
      upload: { title: 'location.png' },
      tasks: [{ title: 'location' }, { title: 'organization' }]
    }
    let result = scorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', score: 1.0}, {title: 'organization', score: 0.0}])
  }

})
