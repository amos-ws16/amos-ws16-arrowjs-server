const buster = require('buster')
const plugin = require('../../lib/plugins/similar-context-plugin.js')

buster.testCase('similar-context-plugin', {
  'should return 1.0 when the keywords of file description and task description match exactly': function () {
    let sString1 = 'president obama woke monday facing congressional defeat parties believed hobble presidency'
    let sString2 = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    let result = plugin(sString1, sString2)
    buster.assert.near(1.0, result, 0)
  },

  'should return 0.0 when the keywords of file description and task description dont match at all': function () {
    let sString1 = '123 3415i 02387564'
    let sString2 = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    let result = plugin(sString1, sString2)
    buster.assert.near(0.0, result, 0)
  },

  'should throw an error if called with a non-string parameter': function () {
    let iNumber = 12
    let sString = 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.'
    buster.assert.exception(() => plugin(iNumber, sString))
  }

})
