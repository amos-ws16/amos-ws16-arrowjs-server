const buster = require('buster')
const plugin = require('../../lib/plugins/file-title-task-description-context-plugin.js')

buster.testCase('File title - Task description comparison (with keyword-extractor)', {
  'should return 1.0 when the keywords of file title and task description match exactly': function () {
    let file = { title: 'president obama woke monday facing congressional defeat parties believed hobble presidency' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin(file, task)
    buster.assert.near(1.0, result, 0)
  },

  'should return 0.0 when the keyword of file title and task description dont match at all': function () {
    let file = { title: '123 3415i 02387564' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin(file, task)
    buster.assert.near(0.0, result, 0)
  }
})
