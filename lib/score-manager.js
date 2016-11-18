const extractObject = require('./extract-object')
const utils = require('./utils')

/**
 * Take an object where each property (key) has an array value of equal length
 * and return an array of that length where each element is an object with the
 * properties of the originial keysOfArrays but only a scalar value. Example:
 *
 *   { a: [1, 2, 3], b: [4, 5, 6] }                 will be transformed to
 *   [ {a: 1, b: 4}, {a: 2, b: 5}, {a: 3, b: 6} ]
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
   * Constructs a ScoreManager using the configuration given by config.
   *
   * Plugins are configured in the config.plugins property, which is an object
   * with properties whose keys are the plugin identifiers. The configuration
   * has the form:
   *   config.plugins = {
   *     'plugin-a': {
   *       score: pluginScoringFunction,
   *       inputs = ['path.to.first.input', 'path.to.second.input.array[].x']
   *     },
   *     'plugin-b': ...
   *   }
   * Each plugin's score field is a plugin function with two arguments. The
   * plugin will receive a subobject and a subobject array of the global input
   * data by means of the path, for example assume that
   *   blob = { a: { b: 'foo' }, c: [ { d: 'bar' }, { d: 'baz' } ] }
   * then the paths ['a.b', 'c[].d'] will refer to the values 'foo' and
   * ['bar', 'baz']. Thus, the plugin configured with this path will be called
   * with score('foo', 'bar') and score('foo', 'baz').
   *
   * The Aggregator is given as the config.aggregator property and must be an
   * object that has a combine(scoresObj) method, which will be called with a
   * scoresObj of the form
   *   scoresObj = {'plugin-a': score-of-a, 'plugin-b': score-of-b, ...}
   *
   * @param config - an object that provides the configuration for Plugins and
   *                 the Aggregator
   */
  constructor (config) {
    this.plugins = config.plugins
    this.aggregator = config.aggregator
  }

  /**
   * Return the individual and aggregated Plugin scores for the given input
   * object. This will score in a one-to-many relationship and will return an
   * array of the form
   *   result = [
   *     {'plugin-a': score-a, 'plugin-b': score-b, 'total': aggregated-score},
   *     ...
   *   ]
   * The number of elements in the result array is defined by the number of
   * elements of the array in the input path (see ScoreManager.constructor()).
   *
   * @param blob - an object with metadata that will be processed by configured
   *               plugins
   */
  score (blob) {
    let scores = {}

    Object.keys(this.plugins).forEach(key => {
      scores[key] = this.scoreWith(key, blob)
    })

    scores = insideOut(scores)
    return scores.map(score => {
      let result = utils.cloneObject(score)
      let total = this.aggregator.combine(score)
      result.total = total
      return result
    })
  }

  /**
   * Score the input data blob using the single plugin defined by pluginId.
   * This method will return an array of scores, one for each element in the
   * configured input array, for example:
   *   plugins = { 'foo': { score: fooFunction, inputs: ['a', 'b[]'] } }  and
   *   blob = { a: 'Hello', b: ['World', 'Goodbye'] }
   * will return
   *   [ fooFunction('Hello', 'World'), fooFunction('Hello', 'Goodbye') ].
   */
  scoreWith (pluginId, blob) {
    let plugin = this.plugins[pluginId]
    let [arg0, arg1] = plugin.inputs.map(i => extractObject(blob, i))
    let scores = arg1.map(arg1 => plugin.score.apply(null, [arg0, arg1]))
    return scores
  }
}

module.exports = ScoreManager
