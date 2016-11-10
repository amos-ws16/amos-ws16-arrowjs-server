/**
 * Takes as an input an object of the form:
 * { upload: {title: <string> },
 *   tasks:  [{title: <string>}, {title: <string2>},...]}
 * Strips file extension from upload.title and compares it to each tasks
 * title property. Returns the same task array with an additional score
 * property field attached. Each score is between 1.0 and 0.0.
 * @param input object with two keys: upload and tasks, upload has the property
 *              title and tasks is an array of objects with the property title
 * @return input.tasks array with additional score property for each entry
 */
function getScore (input) {
  const ititle = input.upload.title
  input.tasks.forEach(function (task, idx, tasks) {
    if (ititle.split('.')[0] === task.title) {
      tasks[idx].score = 1.0
    } else {
      tasks[idx].score = 0.0
    }
  })
  return input.tasks
}

module.exports = { getScore }
