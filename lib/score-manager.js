const extractObject = require('./extract-object')

/** Returns a copy of the given object. */
function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Take an object where each property (key) has an array value of equal length
 * and return an array of that length where each element is an object with the
 * properties of the originial keysOfArrays but only a scalar value.
 */
function insideOut (keysOfArrays) {
  let len = Object.values(keysOfArrays)[0].length
  let arrayOfKeys = []
  for (let i = 0; i < len; i++) {
    let keys = {}
    Object.keys(keysOfArrays).forEach(k => {
      keys[k] = keysOfArrays[k][i]
    })

    arrayOfKeys[i] = keys
  }

  return arrayOfKeys
}

/**
 * There are three important concepts that facilitate assigning a score to
 * tasks representing the degree to which they match an uploaded file and it's
 * metadata: the ScoreManager, one or more Plugins and an Aggregator.
 *
 * A Plugin is a function that takes two argument - a file object that
 * contains meta data, for example the filename, size, time of upload and/or
 * the file contents, and a task object that contains meta data related to the
 * task, for example the task name. It returns a floating point numeric score
 * in the range 0.0 to 1.0 which describes the degree in which the file and
 * the task are correlated in the aspect that this particular Plugin is focused
 * on. For example, the `same-title` Plugin will return 1.0 if the title of the
 * file is the same as the title of the task and 0.0 otherwise.
 *
 * An Aggregator is a policy that combines a set of scores that were previously
 * assigned to a task by multiple Plugins into a single final score value. For
 * more details see score-aggregator.js.
 *
 * The purpose of the ScoreManager is to provide the entry point for a scoring
 * request, delegate the data to multiple Plugins, and combine their individual
 * scores using an Aggregator.
 */
class ScoreManager {
  /**
   * Constructs a ScoreManager and sets the Aggregator that will be used
   * to combine scores of multiple Plugins.
   *
   * @param scoreAggregator - an object that provides the combine(scoresObj)
   *                          method
   */
  constructor (config) {
    this.plugins = config.plugins
    this.aggregator = config.aggregator
  }

  /**
   * Given an object blob = { file: fileObj, tasks: taskArray } return the
   * taskArray annotated with an additional score for each task in the array.
   * For example, if
   *   taskArray = [{ name: 'first name' }, { name: 'second task' }]
   * then the return value will have the form
   *   taskArray = [
   *     { name: 'first name', score: firstScore },
   *     { name: 'second task', score: secondScore }
   *   ]
   * where both firstScore and secondScore are numbers between 0.0 and 1.0.
   * @param blob - an object with file metadata in blob.file and an array of
   *               tasks in blob.tasks
   */
  score (blob) {
    let scores = {}

    Object.keys(this.plugins).forEach(key => {
      scores[key] = this.scoreWith(key, blob)
    })

    scores = insideOut(scores)
    return scores.map(score => {
      let result = cloneObject(score)
      let total = this.aggregator.combine(score)
      result.total = total
      return result
    })
  }

  /**
   * Score blob using plugin specified by pluginId.
   *
   * Assume that the second path is an array path. call plugin with arguments
   * (arg0, arg1[i]) N times where 0 < i < N and N == length input array.
   */
  scoreWith (pluginId, blob) {
    let plugin = this.plugins[pluginId]
    let [arg0, arg1] = plugin.inputs.map(i => extractObject(blob, i))
    let scores = arg1.map(arg1 => plugin.score.apply(null, [arg0, arg1]))
    return scores
  }
}

module.exports = ScoreManager
