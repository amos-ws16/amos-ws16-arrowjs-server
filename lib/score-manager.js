/** Apply each plugin to the file, task pair and return scores. */
function applyPlugins (plugins, file, task) {
  let scores = {}

  Object.keys(plugins).forEach((key, idx) => {
    scores[key] = plugins[key](file, task)
  })

  return scores
}

/** Returns a copy of the given object. */
function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
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
  constructor (scoreAggregator) {
    this.plugins = []

    if (scoreAggregator == null) {
      throw new Error('There must be a ScoreCombiner')
    }
    this.scoreAggregator = scoreAggregator
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
    let tasks = blob.tasks
    let file = blob.file
    tasks.forEach((task, id, tasks) => {
      let originalTask = cloneObject(task)

      task.scores = applyPlugins(this.plugins, file, originalTask)
      task.score = this.scoreAggregator.combine(task.scores)
    })
    return tasks
  }

  /**
   * Registers the Plugin defined by plugin under the given name. The Plugin is
   * a function that takes two arguments (file, task) where file is the meta
   * data of the file and task is the meta data of one of the canidate tasks
   * to be scored for this file. plugin should return a number between 0.0 and
   * 1.0 where 0.0 means no correlation and 1.0 means total match for the
   * criterion that this Plugin is concerned with.
   *
   * @param name - a string that identifies the Plugin
   * @param plugin - a function with arguments (file, task) that scores their
   *                 correlation
   */
  registerPlugin (name, plugin) {
    this.plugins[name] = plugin
  }
}

module.exports = ScoreManager
