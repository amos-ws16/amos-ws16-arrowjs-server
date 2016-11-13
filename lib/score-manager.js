/** Represents a collection of scoring methods. */
class ScoreManager {
  /** Constructs a default ScoreManager. Set the default plugin to return
    * always 1.0 */
  constructor (scoreCombiner) {
    this.plugins = []

    if (scoreCombiner == null) {
      throw new Error('There must be a ScoreCombiner')
    }
    this.scoreCombiner = scoreCombiner
  }

  /** Apply each plugin to the file, task pair and return scores. */
  applyPlugins (file, task) {
    let scores = {}

    Object.keys(this.plugins).forEach((key, idx) => {
      scores[key] = this.plugins[key](file, task)
    })

    return scores
  }

  /** Score a blob of data using some policy. */
  score (blob) {
    let tasks = blob.tasks
    let file = blob.file
    tasks.forEach((task, id, tasks) => {
      let originalTask = this.cloneTask(task)

      task.scores = this.applyPlugins(file, originalTask)
      task.score = this.scoreCombiner.combine(task.scores)
    })
    return tasks
  }

  /** Returns a copy of the given task. */
  cloneTask (task) {
    return { name: task.name }
  }

  /** Registers the plugin defined by scoringFunction under the name name */
  registerPlugin (name, scoringFunction) {
    this.plugins[name] = scoringFunction
  }
}

module.exports = ScoreManager
