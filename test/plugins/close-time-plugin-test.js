const buster = require('buster')
const plugin = require('../../lib/plugins/close-time-plugin.js')

const timedifferenceLimit = 600
const uploadTimestamp = 1478886423.003

buster.testCase('Input Scorer', {
  'should return 1.0 when timing matches exactly': function () {
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: uploadTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 if timstamps differ more than timedifferenceLimit': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit - 1
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: taskTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 0.0)
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit / 2
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: taskTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 0.5)
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + timedifferenceLimit / 2
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: taskTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 0.5)
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - 3 * timedifferenceLimit / 4
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: taskTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 0.25)
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + 3 * timedifferenceLimit / 4
    let file = { timestamp: uploadTimestamp }
    let task = { timestamp: taskTimestamp }
    let result = plugin(file, task)
    buster.assert.equals(result, 0.25)
  },

  'should throw \'no timestamp exception\' if no timestamp is present in file': function () {
    const taskTimestamp = uploadTimestamp
    let file = { }
    let task = { timestamp: taskTimestamp }
    buster.assert.exception(() => plugin(file, task))
  }

})
