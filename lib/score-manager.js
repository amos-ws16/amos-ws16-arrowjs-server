/** Represents a collection of scoring methods. */
class ScoreManager {
  /** Constructs a default ScoreManager. Set the default plugin to return
    * always 1.0 */
  constructor () {
    this.plugins = []
  }

  /** Score a blob of data using some policy. */
  score (blob) {
    let tasks = blob.tasks
    let file = blob.file
    tasks.forEach((task, id, tasks) => {
      let originalTask = this.cloneTask(task)
      task.scores = {}

      Object.keys(this.plugins).forEach((key, idx) => {
        task.scores[key] = this.plugins[key](file, originalTask)
      })

      task.score = task.scores[Object.keys(this.plugins)[0]]
    })
    return tasks
  }

  /** Very simplisticly clones a task. */
  cloneTask (task) {
    return { name: task.name }
  }

  /** Registers the plugin defined by scoringFunction under the name name */
  registerPlugin (name, scoringFunction) {
    this.plugins[name] = scoringFunction
  }
}

module.exports = ScoreManager
