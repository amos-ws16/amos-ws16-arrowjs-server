const buster = require('buster')
const plugin = require('../../lib/plugins/file-description-task-description-plugin.js')

buster.testCase('File description - Task description comparison (string-similarity)', {
  'should return 1.0 when file description and task description match exactly': function () {
    let file = { description: 'Test Title' }
    let task = { description: 'Test Title' }
    let result = plugin(file, task)
    buster.assert.near(1.0, result, 0)
  },

  'should return 0.0 when file description and task description dont match at all': function () {
    let file = { description: 'AAAAA' }
    let task = { description: '91872634' }
    let result = plugin(file, task)
    buster.assert.near(0.0, result, 0)
  },

  'should return 0.67 when file description and task description match a little bit': function () {
    let file = { description: 'AAAAA' }
    let task = { description: 'AAAAA AAAAA' }
    let result = plugin(file, task).toFixed(2)
    buster.assert.near(0.67, result, 0)
  },

  'should return 0.5 when file description and task description dont match at all': function () {
    let file = { description: 'AAAAA AAAAA' }
    let task = { description: 'AAAAA BBBBB' }
    let result = plugin(file, task)
    buster.assert.near(0.5, result, 0)
  }
})
