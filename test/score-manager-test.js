const buster = require('buster')
const ScoreManager = require('../lib/score-manager')

buster.testCase('Score Manager', {
  setUp: function () {
    this.scoreManager = new ScoreManager()
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
