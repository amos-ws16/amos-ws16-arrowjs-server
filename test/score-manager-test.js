const buster = require('buster')
const ScoreManager = require('../lib/score-manager')
const aggregator = require('../lib/score-aggregator')

const sameTitlePlugin = require('../lib/plugins/same-title-plugin')

buster.testCase('ScoreManager with configuration', {
  'scoreWith': {
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

      buster.assert.calledWith(this.stubPlugin, 'foo', 'bar')
      buster.assert.calledWith(this.stubPlugin, 'foo', 'baz')
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

      buster.assert.calledWith(this.stubPlugin, 'hello', 'world')
      buster.assert.calledWith(this.stubPlugin, 'hello', 'goodbye')
    },

    'should return what the plugin returned': function () {
      this.stubPlugin.onCall(0).returns(0.123)
      this.stubPlugin.onCall(1).returns(0.456)
      let blob = {
        x: { y: { z: 'foo' } },
        a: { b: [
          { c: 'bar' },
          { c: 'baz' }
        ] }
      }

      let result = this.manager.scoreWith('plugin-a', blob)

      buster.assert.equals(result, [0.123, 0.456])
    }
  },

  'score using Aggregator': {
    setUp: function () {
      this.stubPluginA = this.stub()
      this.stubPluginB = this.stub()
      this.stubAggregator = this.stub()
      let config = {
        aggregator: { combine: this.stubAggregator },
        plugins: {
          'plugin-a': {
            score: this.stubPluginA,
            inputs: ['x', 'y[]']
          },
          'plugin-b': {
            score: this.stubPluginB,
            inputs: ['x', 'y[]']
          }
        }
      }
      this.manager = new ScoreManager(config)
    },

    'should use the config provided aggregator': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)

      this.manager.score({ x: {}, y: [0] })

      buster.assert.calledWith(this.stubAggregator,
        { 'plugin-a': 0.5, 'plugin-b': 0.8 })
    },

    'should return the scores returned by the aggregator in field total': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)
      this.stubAggregator.returns(0.1)

      let scores = this.manager.score({ x: {}, y: [0] })

      buster.assert.equals(scores, [{ 'total': 0.1, 'plugin-a': 0.5, 'plugin-b': 0.8 }])
    }
  }
})

buster.testCase('ScoreManager Integration', {
  'should be able to use sameTitlePlugin': function () {
    let config = {
      aggregator: new aggregator.Largest(),
      plugins: {
        'same-title': {
          score: sameTitlePlugin,
          inputs: ['file', 'tasks[]']
        }
      }
    }
    let manager = new ScoreManager(config)

    let blob = {
      file: { title: 'location.png' },
      tasks: [
        { title: 'location' },
        { title: 'something_else' }
      ]
    }

    let result = manager.score(blob)
    buster.assert.near(result[0].total, 1.0, 1e-3)
    buster.assert.near(result[1].total, 0.0, 1e-3)
  }
})

