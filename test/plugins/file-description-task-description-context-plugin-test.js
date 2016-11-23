const buster = require('buster')
const plugin = require('../../lib/plugins/file-description-task-description-context-plugin.js')

buster.testCase('File description - Task description comparison (with keyword-extractor)', {
  'should return 1.0 when the keywords of file description and task description match exactly': function () {
    let file = { description: 'president obama woke monday facing congressional defeat parties believed hobble presidency' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin(file, task)
    buster.assert.near(1.0, result, 0)
  },

  'should return 0.0 when the keywords of file description and task description dont match at all': function () {
    let file = { description: '123 3415i 02387564' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin(file, task)
    buster.assert.near(0.0, result, 0)
  }
})
