const buster = require('buster')
const titleContextPlugin = require('../../lib/plugins/title-context-plugin.js')
const stringSimilarity = require('string-similarity')

buster.testCase('titleContextPlugin', {
  'should return the same value as Stringsimilarity compare method': function () {
    this.stub(stringSimilarity, 'compareTwoStrings').returns(1.0)
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    let result = titleContextPlugin(file, task)
    buster.assert.near(result, 1.0, 1e-3)
  },

  'should call Stringsimilarity compare method': function () {
    let compare = this.stub(stringSimilarity, 'compareTwoStrings')
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    titleContextPlugin(file, task)
    buster.assert.called(compare)
  },

  'should pass two strings for Stringsimilarity compare method': function () {
    let compare = this.stub(stringSimilarity, 'compareTwoStrings')
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    titleContextPlugin(file, task)
    buster.assert.calledWith(compare, 'healed', 'sealed')
  }
})
