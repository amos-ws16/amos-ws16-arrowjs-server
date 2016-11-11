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
    tasks.forEach((task, id, tasks) => {
      tasks[id].scores = {}

      Object.keys(this.plugins).forEach((key, idx) => {
        tasks[id].scores[key] = this.plugins[key](null, task)
      })

      tasks[id].score = tasks[id].scores[Object.keys(this.plugins)[0]]
    })
    return tasks
  }

  /** Registers the plugin defined by scoringFunction under the name name */
  registerPlugin (name, scoringFunction) {
    this.plugins[name] = scoringFunction
  }
}

module.exports = ScoreManager
