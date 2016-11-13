const buster = require('buster')
const timingScorer = require('../lib/timingScorer')

const timedifferenceLimit = 600
const uploadTimestamp = 1478886423.003

buster.testCase('Input Scorer', {
  'should return 1.0 when timing matches exactly': function () {
    const input = {
      upload: { title: 'location', timestamp: uploadTimestamp },
      tasks: [{title: 'location', timestamp: uploadTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: uploadTimestamp, score: 1.0}])
  },

  'should return 0.0 if timstamps differ more than timedifferenceLimit': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit - 1
    const input = {
      upload: { title: 'location', timestamp: uploadTimestamp },
      tasks: [{title: 'location', timestamp: taskTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: taskTimestamp, score: 0.0}])
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit / 2
    const input = {
      upload: { title: 'location', timestamp: uploadTimestamp },
      tasks: [{title: 'location', timestamp: taskTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: taskTimestamp, score: 0.5}])
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + timedifferenceLimit / 2
    const input = {
      upload: { title: 'location', timestamp: '1478886423.003' },
      tasks: [{title: 'location', timestamp: taskTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: taskTimestamp, score: 0.5}])
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit / 2
    const input = {
      upload: { title: 'location', timestamp: '1478886423.003' },
      tasks: [{title: 'location', timestamp: taskTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: taskTimestamp, score: 0.5}])
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + timedifferenceLimit / 2
    const input = {
      upload: { title: 'location', timestamp: '1478886423.003' },
      tasks: [{title: 'location', timestamp: taskTimestamp}]
    }
    let result = timingScorer.getScore(input)
    buster.assert.equals(result, [{title: 'location', timestamp: taskTimestamp, score: 0.5}])
  }

})
