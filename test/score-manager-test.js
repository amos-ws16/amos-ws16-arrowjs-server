const buster = require('buster')
const ScoreManager = require('../lib/score-manager')
const ScoreCombiner = require('../lib/score-combiner')

buster.testCase('Score Manager', {
  setUp: function () {
    this.meanCombiner = new ScoreCombiner.Mean()
    this.scoreManager = new ScoreManager(this.meanCombiner)
    this.scoreManager.registerPlugin('default-plugin', () => 0.42)
  },

  'should have an interface': function () {
    let blob = {
      tasks: [
        { name: 'blub' },
        { name: 'foo' }
      ]
    }

    let result = this.scoreManager.score(blob)

    buster.assert.isArray(result)
    result.forEach((element) => {
      buster.assert.isNumber(element.score)
      buster.assert(element.score >= 0 && element.score <= 1)
    })
  },

  'should return only tasks that were given as arguments': function () {
    let blob = {
      tasks: [
        { name: 'blub' }
      ]
    }

    let result = this.scoreManager.score(blob)

    buster.assert.equals(result[0].name, 'blub')
  },

  'should return only tasks that were given as arguments 2': function () {
    let blob = {
      tasks: [
        { name: 'blub' },
        { name: 'foo' }
      ]
    }

    let result = this.scoreManager.score(blob)

    buster.assert.equals(result[0].name, 'blub')
    buster.assert.equals(result[1].name, 'foo')
  },

  'should take a plugin and return the output of the plugin\'s score function': function () {
    let blob = {
      file: {},
      tasks: [
        { name: 'foo' }
      ]
    }

    let result = this.scoreManager.score(blob)

    buster.assert.near(result[0].score, 0.42, 1e-3)
  },

  'should take multiple plugins and return multiple scores': function () {
    this.scoreManager.registerPlugin('plugin-a', (file, task) => 1.0)
    this.scoreManager.registerPlugin('plugin-b', (file, task) => 0.5)
    this.scoreManager.registerPlugin('plugin-c', (file, task) => 0.0)
    let blob = {
      file: {},
      tasks: [
        { name: 'foo' }
      ]
    }

    let result = this.scoreManager.score(blob)

    buster.assert.equals(result[0].scores,
      {'default-plugin': 0.42, 'plugin-a': 1.0, 'plugin-b': 0.5, 'plugin-c': 0.0}
    )
  },

  'should pass file from blob on to all the plugins': function () {
    let pluginStub = this.stub()
    this.scoreManager.registerPlugin('plugin-stub', pluginStub)

    let blob = {
      file: { data: 'Hello' },
      tasks: [ { name: 'foo' } ]
    }

    this.scoreManager.score(blob)

    buster.assert.calledWith(pluginStub, { data: 'Hello' }, { name: 'foo' })
  }

})

buster.testCase('Score Manager with ScoreCombiner', {
  'score manager should take a score combiner as an input': function () {
    buster.assert.exception(() => new ScoreManager().score())
  },

  'return an overall score which is the mean value for one task': function () {
    var meanCombiner = new ScoreCombiner.Mean()
    var scoreManager = new ScoreManager(meanCombiner)
    scoreManager.registerPlugin('plugin-a', (file, task) => 0.3)
    scoreManager.registerPlugin('plugin-b', (file, task) => 0.6)
    scoreManager.registerPlugin('plugin-c', (file, task) => 0.9)
    let blob = {
      file: {},
      tasks: [
        { name: 'foo' }
      ]
    }
    var result = scoreManager.score(blob)
    buster.assert.near(result[0].score, 0.6, 1e-3)
  },

  'different ScoreCombiners can be used': function () {
    var largestCombiner = new ScoreCombiner.Largest()
    var largestScoreManager = new ScoreManager(largestCombiner)
    largestScoreManager.registerPlugin('plugin-a', (file, task) => 0.3)
    largestScoreManager.registerPlugin('plugin-b', (file, task) => 0.6)

    var meanCombiner = new ScoreCombiner.Mean()
    var meanScoreManager = new ScoreManager(meanCombiner)
    meanScoreManager.registerPlugin('plugin-a', (file, task) => 0.3)
    meanScoreManager.registerPlugin('plugin-b', (file, task) => 0.6)

    let blob = {
      file: {},
      tasks: [
        { name: 'foo' }
      ]
    }

    var largestResult = largestScoreManager.score(blob)
    buster.assert.near(largestResult[0].score, 0.6, 1e-3)

    var meanScoreResult = meanScoreManager.score(blob)
    buster.assert.near(meanScoreResult[0].score, 0.45, 1e-3)
  }

})
