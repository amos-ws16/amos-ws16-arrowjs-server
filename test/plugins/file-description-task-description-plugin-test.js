const buster = require('buster')
const plugin = require('../../lib/plugins/file-description-task-description-plugin.js')

buster.testCase('File description - Task description comparison (string-similarity)', {
  'should return 1.0 when file description and task description match exactly': function () {
    let file = { description: 'Test Title' }
    let task = { description: 'Test Title' }
    let result = plugin.fileDescriptionTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 when file description and task description dont match at all': function () {
    let file = { description: 'AAAAA' }
    let task = { description: '91872634' }
    let result = plugin.fileDescriptionTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 0.0)
  },

  'should return 0.67 when file description and task description match a little bit': function () {
    let file = { description: 'AAAAA' }
    let task = { description: 'AAAAA AAAAA' }
    let result = plugin.fileDescriptionTaskDescriptionSimiliarity(file, task).toFixed(2)
    buster.assert.equals(result, (0.67).toFixed(2))
  },

  'should return 0.5 when file description and task description dont match at all': function () {
    let file = { description: 'AAAAA AAAAA' }
    let task = { description: 'AAAAA BBBBB' }
    let result = plugin.fileDescriptionTaskDescriptionSimiliarity(file, task)
    buster.assert.equals(result, 0.5)
  }
})

buster.testCase('File description - Task description comparison (with keyword-extractor)', {
  'should return 1.0 when the keywords of file description and task description match exactly': function () {
    let file = { description: 'president obama woke monday facing congressional defeat parties believed hobble presidency' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin.fileDescriptionTaskDescriptionContex(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 when the keywords of file description and task description dont match at all': function () {
    let file = { description: '123 3415i 02387564' }
    let task = { description: 'President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency.' }
    let result = plugin.fileDescriptionTaskDescriptionContex(file, task)
    buster.assert.equals(result, 0.0)
  }
})
