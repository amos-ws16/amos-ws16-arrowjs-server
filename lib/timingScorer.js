const timeLimit = 600
/**
 * Takes as an input an object of the form:
 * { upload: {title: <string>, timestamp: <float> },
 *   tasks:  [{title: <string>, timestamp: <float>}, {title: <string2>,
 * timestamp: <float2>},...]}
 * Compares each tasks timestamp to upload timestamp.
 * Returns the same task array with an additional score
 * property field attached. Each score is between 1.0 and 0.0 and decreases
 * linear with increasing difference between timestamps. Time differences greater
 * than timeLimit will result in a score of 0.0.
 * @param input object with two keys: upload and tasks, upload has the properties
 *              title and and timestamp, tasks is an array of objects with the
 * properties title and timestamp
 * @return input.tasks array with additional score property for each entry
 */
function getScore (input) {
  const itimestamp = input.upload.timestamp
  input.tasks.forEach(function (task, idx, tasks) {
    let difference = Math.abs(itimestamp - task.timestamp)
    if (difference < timeLimit) {
      tasks[idx].score = 1.0 * (timeLimit - difference) / timeLimit
    } else {
      tasks[idx].score = 0.0
    }
  })
  return input.tasks
}

module.exports = { getScore }
