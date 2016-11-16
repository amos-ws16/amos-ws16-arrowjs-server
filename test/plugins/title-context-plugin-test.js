const buster = require('buster')
const utils = require('../../lib/utils.js')
const titleContextPlugin = require('../../lib/plugins/title-context-plugin.js')
const stringSimilarity = require('string-similarity')

buster.testCase('titleContextPlugin', {
  'should return the same value as Stringsimilarity compare method': function () {
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    let result = titleContextPlugin(file, task)
    buster.assert.equals(result, stringSimilarity.compareTwoStrings(utils.basename(file.title), task.title))
  }
})
