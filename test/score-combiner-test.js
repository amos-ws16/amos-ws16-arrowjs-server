var buster = require('buster')
var scorecombiner = require('../lib/score-combiner')

buster.testCase('mean', {
  'should score with the mean value of four input Qs': function () {
    var scores = {
      'default-plugin': 0.42,
      'plugin-a': 1.0,
      'plugin-b': 0.5,
      'plugin-c': 0.0
    }

    buster.assert.near(new scorecombiner.Mean().combine(scores), 0.48, 1e-3)
  },

  'should score with the mean value of two input scores': function () {
    var scores = {
      'default-plugin': 0.42,
      'plugin-a': 1.0
    }
    buster.assert.near(new scorecombiner.Mean().combine(scores), 0.71, 1e-3)
  },

  'should raise an error when no scores are given': function () {
    buster.assert.exception(() => new scorecombiner.Mean().combine())
    buster.assert.exception(() => new scorecombiner.Mean().combine({}))
  }
})
