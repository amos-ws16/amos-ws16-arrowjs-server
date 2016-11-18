const buster = require('buster')
const ScoreManager = require('../lib/score-manager')
const aggregator = require('../lib/score-aggregator')
const sameTitlePlugin = require('../lib/plugins/same-title-plugin')

buster.testCase('Score Manager', {
  setUp: function () {
    this.meanCombiner = new aggregator.Mean()
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

  'should pass file from blob on to the plugin': function () {
    let pluginStub = this.stub()
    this.scoreManager.registerPlugin('plugin-stub', pluginStub)

    let blob = {
      file: { data: 'Hello' },
      tasks: [ { name: 'foo' } ]
    }

    this.scoreManager.score(blob)

    buster.assert.calledWith(pluginStub, { data: 'Hello' }, { name: 'foo' })
  },

  'should pass a copy of the task from the blob to the plugin': function () {
    let pluginStub = this.stub()
    this.scoreManager.registerPlugin('plugin-stub', pluginStub)

    let blob = {
      file: { data: 'Hello' },
      tasks: [ { some_key: 'foo' } ]
    }

    this.scoreManager.score(blob)

    buster.assert.calledWith(pluginStub, { data: 'Hello' }, { some_key: 'foo' })
  }
})

buster.testCase('Score Manager with aggregator', {
  'score manager should take a score combiner as an input': function () {
    buster.assert.exception(() => new ScoreManager().score())
  },

  'return an overall score which is the mean value for one task': function () {
    var meanCombiner = new aggregator.Mean()
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
    var largestCombiner = new aggregator.Largest()
    var largestScoreManager = new ScoreManager(largestCombiner)
    largestScoreManager.registerPlugin('plugin-a', (file, task) => 0.3)
    largestScoreManager.registerPlugin('plugin-b', (file, task) => 0.6)

    var meanCombiner = new aggregator.Mean()
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

buster.testCase('=> Score Manager Configuration', {
  setUp: function () {
    this.stubPlugin = this.stub()
    let config = {
      plugins: {
        'plugin-a': {
          score: this.stubPlugin,
          inputs: ['x.y.z', 'a.b[].c']
        }
      }
    }
    this.manager = new ScoreManager(config)
  },

  'should call plugin with inputs defined by path': function () {
    let blob = {
      x: { y: { z: 'foo' } },
      a: { b: [
        { c: 'bar' },
        { c: 'baz' }
      ] }
    }

    this.manager.scoreWith('plugin-a', blob)

    buster.assert.calledWith(this.stubPlugin, 'foo', [ 'bar', 'baz' ])
  },

  'should call plugin with inputs defined by path 2': function () {
    let blob = {
      x: { y: { z: 'hello' } },
      a: { b: [
        { c: 'world' },
        { c: 'goodbye' }
      ] }
    }

    this.manager.scoreWith('plugin-a', blob)

    buster.assert.calledWith(this.stubPlugin, 'hello', [ 'world', 'goodbye' ])
  }
})

buster.testCase('Score Manager Integration', {
  'should be able to use sameTitlePlugin': function () {
    let manager = new ScoreManager(new aggregator.Largest())
    manager.registerPlugin('same-title', sameTitlePlugin)

    let blob = {
      file: { title: 'location.png' },
      tasks: [
        { title: 'location' },
        { title: 'something_else' }
      ]
    }

    let result = manager.score(blob)
    buster.assert.near(result[0].score, 1.0, 1e-3)
    buster.assert.near(result[1].score, 0.0, 1e-3)
  }
})

