const buster = require('buster')
const plugin = require('../../lib/plugins/file-title-task-description-plugin.js')

buster.testCase('File title - Task description comparison (string-similarity)', {
  'should return 1.0 when file title and task description match exactly': function () {
    let file = { title: 'Test Title' }
    let task = { description: 'Test Title' }
    let result = plugin(file, task)
    buster.assert.near(1.0, result, 0)
  },

  'should return 0.0 when file title and task description dont match at all': function () {
    let file = { title: 'AAAAA' }
    let task = { description: '91872634' }
    let result = plugin(file, task)
    buster.assert.near(0.0, result, 0)
  },

  'should return 0.67 when file title and task description match a little bit': function () {
    let file = { title: 'AAAAA' }
    let task = { description: 'AAAAA AAAAA' }
    let result = plugin(file, task).toFixed(2)
    buster.assert.near(0.67, result, 0)
  },

  'should return 0.5 when file title and task description dont match at all': function () {
    let file = { title: 'AAAAA AAAAA' }
    let task = { description: 'AAAAA BBBBB' }
    let result = plugin(file, task)
    buster.assert.near(0.5, result, 0)
  }
})
