const stringSimilarity = require('string-similarity')

/**
 * Uses the string-similarity module to compare the file description and the task description
 *
 * @param file - the file with its description
 * @param task - the task with its description
 */
function fileDescriptionTaskDescriptionSimiliarity (file, task) {
  checkValidity(file, task)
  const sFileDescription = file.description
  const sTaskDescription = task.description

  return stringSimilarity.compareTwoStrings(sFileDescription, sTaskDescription)
}

/**
* Check if title and task have the required properties
*
* @param file - the file with its title
* @param task - the task with its description
*/
function checkValidity (file, task) {
  if (!file.hasOwnProperty('description')) {
    throw new Error('file.description not found')
  }
  if (!task.hasOwnProperty('description')) {
    throw new Error('task.description not found')
  }
}

module.exports = fileDescriptionTaskDescriptionSimiliarity
