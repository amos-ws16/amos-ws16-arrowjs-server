var buster = require('buster')
var aggregator = require('../lib/score-aggregator')

buster.testCase('mean', {
  'should score with the mean value of four input Qs': function () {
    var scores = {
      'default-plugin': 0.42,
      'plugin-a': 1.0,
      'plugin-b': 0.5,
      'plugin-c': 0.0
    }

    buster.assert.near(new aggregator.Mean().combine(scores), 0.48, 1e-3)
  },

  'should score with the mean value of two input scores': function () {
    var scores = {
      'default-plugin': 0.42,
      'plugin-a': 1.0
    }
    buster.assert.near(new aggregator.Mean().combine(scores), 0.71, 1e-3)
  },

  'should raise an error when no scores are given': function () {
    buster.assert.exception(() => new aggregator.Mean().combine())
    buster.assert.exception(() => new aggregator.Mean().combine({}))
  }
})

buster.testCase('Weighted Mean', {
  'should construct successfully when weights add up to 1.0': function () {
    let weights = { 'plugin-a': 0.1, 'plugin-b': 0.9 }
    let weightedMean = new aggregator.WeightedMean(weights)
    buster.assert(weightedMean)
  },

  'should fail to construct when summed weights are less than 1.0': function () {
    let weights = { 'plugin-a': 0.1, 'plugin-b': 0.2 }
    buster.assert.exception(() => new aggregator.WeightedMean(weights))
  },

  'should fail to construct when summed weights are greater than 1.0': function () {
    let weights = { 'plugin-a': 0.1, 'plugin-b': 0.9, 'plugin-c': 0.3 }
    buster.assert.exception(() => new aggregator.WeightedMean(weights))
  },

  'should return the given score when only one weight is given': function () {
    let combiner = new aggregator.WeightedMean({ 'plug': 1.0 })
    let scores = { 'plug': 0.5 }
    let result = combiner.combine(scores)
    buster.assert.near(result, 0.5, 1e-3)
  },

  'should return the given score when only one weight is given 2': function () {
    let combiner = new aggregator.WeightedMean({ 'plug': 1.0 })
    let scores = { 'plug': 0.1 }
    let result = combiner.combine(scores)
    buster.assert.near(result, 0.1, 1e-3)
  },

  'should return the weighted mean for two scores': function () {
    let weights = { 'plug-a': 0.2, 'plug-b': 0.8 }
    let combiner = new aggregator.WeightedMean(weights)
    let scores = { 'plug-a': 1.0, 'plug-b': 1.0 }
    let result = combiner.combine(scores)
    // (0.2*1.0 + 0.8*1.0)/2 = 1.0/2 = 0.5
    buster.assert.near(result, 0.5, 1e-3)
  },

  'should set not listed weights to zero': function () {
    let weights = { 'plug-a': 0.2, 'plug-b': 0.8 }
    let combiner = new aggregator.WeightedMean(weights)
    let scores = { 'plug-a': 1.0, 'plug-b': 1.0, 'plug-c': 0.2 }
    let result = combiner.combine(scores)
    // (0.2*1.0 + 0.8*1.0 + 0.0*0.2)/3 = 1.0/3 = 0.333
    buster.assert.near(result, 0.3333, 1e-3)
  }

})
