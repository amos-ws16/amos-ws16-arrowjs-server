const buster = require('buster')
const stringSimilarity = require('string-similarity')
const plugin = require('../../lib/plugins/similar-context-plugin.js')

buster.testCase('similar-context-plugin', {
  'test1 - with Keywordsextraction: should return 1.0 when both strings matches': function () {
    let sString1 = 'president obama woke monday facing congressional defeat parties believed hobble presidency'
    let sString2 = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    let result = plugin(sString1, sString2, true)
    buster.assert.near(1.0, result, 0)
  },

  'test2 - with Keywordsextraction: should return 0.0 when both strings dont match at all': function () {
    let sString1 = '123 3415i 02387564'
    let sString2 = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    let result = plugin(sString1, sString2, true)
    buster.assert.near(0.0, result, 0)
  },

  'test4 - without Keywordsextraction: should return 1.0 when both strings matches': function () {
    let sString1 = 'president obama'
    let sString2 = 'president obama'
    let result = plugin(sString1, sString2, false)
    buster.assert.near(1.0, result, 0)
  },

  'test5 - without Keywordsextraction: should return 0.0 both strings dont match at all': function () {
    let sString1 = '123 3415i 02387564'
    let sString2 = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    let result = plugin(sString1, sString2, false)
    buster.assert.near(0.0, result, 0)
  },

  'test6 - without Keywordsextraction: should return the same value as Stringsimilarity compare method': function () {
    this.stub(stringSimilarity, 'compareTwoStrings').returns(1.0)
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    let result = plugin(file.title, task.title, false)
    buster.assert.near(result, 1.0, 1e-3)
  },

  'test7 - should call Stringsimilarity compare method': function () {
    let compare = this.stub(stringSimilarity, 'compareTwoStrings')
    let file = {
      title: 'healed.jpeg'
    }
    let task = {
      title: 'sealed'
    }

    plugin(file.title, task.title)
    buster.assert.called(compare)
  },

  'test8 - should throw an error if called with a non-string parameter': function () {
    let iNumber = 12
    let sString = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    buster.assert.exception(() => plugin(iNumber, sString))
  },

  'test9 - should throw an error if only 1 string is passed for comparison to the plugin': function () {
    let sString = 'test'
    buster.assert.exception(() => plugin(sString))
  },

  'test10 - should throw an error if no strings are passed for comparison': function () {
    buster.assert.exception(() => plugin())
  },

  'test11 - should throw an error if the last parameter - extractKeywords - is not a boolean': function () {
    let sString1 = 'test'
    let sString2 = 'test'
    let extract = 'test'
    buster.assert.exception(() => plugin(sString1, sString2, extract))
  }

})
