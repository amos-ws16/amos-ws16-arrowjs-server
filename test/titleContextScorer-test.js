const buster = require('buster')
const titleContextScorer = require('../lib/titleContextScorer')

buster.testCase('Title Context Score Test', {
  'should return 1.0 when title and task matches exactly': function () {
    const input = {
      upload: {
        title: 'testcase'
      },
      tasks: [
        {
          title: 'testcase'
        }
      ]
    }
    let result = titleContextScorer.getScore(input)
    buster.assert.equals(result,
      [
        {
          title: 'testcase',
          score: 1
        }
      ]
    )
  }
})
