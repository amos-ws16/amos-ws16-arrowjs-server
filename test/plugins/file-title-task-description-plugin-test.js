const buster = require('buster')
const plugin = require('../../lib/plugins/file-title-task-description-plugin.js')

buster.testCase('File title - Task description comparison (string-similarity)', {
  'should return 1.0 when file title and task description match exactly': function () {
    let file = { title: 'Test Title' }
    let task = { description: 'Test Title' }
    let result = plugin.fileTitleTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 when file title and task description dont match at all': function () {
    let file = { title: 'AAAAA' }
    let task = { description: '91872634' }
    let result = plugin.fileTitleTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 0.0)
  },

  'should return 0.67 when file title and task description match a little bit': function () {
    let file = { title: 'AAAAA' }
    let task = { description: 'AAAAA AAAAA' }
    let result = plugin.fileTitleTaskDescriptionSimiliarity(file, task).toFixed(2)
    buster.assert.equals(result, (0.67).toFixed(2))
  },

  'should return 0.5 when file title and task description dont match at all': function () {
    let file = { title: 'AAAAA AAAAA' }
    let task = { description: 'AAAAA BBBBB' }
    let result = plugin.fileTitleTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 0.5)
  }
})

buster.testCase('File title - Task description comparison (with keyword-extractor)', {
  'should return 1.0 when the keywords of file title and task description match exactly': function () {
    let file = { title: 'president obama woke monday facing congressional defeat parties believed hobble presidency' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin.fileTitleTaskDescriptionContex(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 when the keyword of file title and task description dont match at all': function () {
    let file = { title: '123 3415i 02387564' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin.fileTitleTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 0.0)
  }
})
