const buster = require('buster')
const similarTitlePlugin = require('../../lib/plugins/similar-title-plugin.js')
const stringSimilarity = require('string-similarity')

buster.testCase('similarTitlePlugin', {
  'should return the same value as Stringsimilarity compare method': function () {
    this.stub(stringSimilarity, 'compareTwoStrings').returns(1.0)
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    let result = similarTitlePlugin(file, task)
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

    similarTitlePlugin(file, task)
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

    similarTitlePlugin(file, task)
    buster.assert.calledWith(compare, 'healed', 'sealed')
  }
})
