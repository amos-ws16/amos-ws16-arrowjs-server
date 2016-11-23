const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')

/**
 * Uses the string-similarity module to compare the file title and the task description
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
function fileTitleTaskDescriptionSimiliarity (file, task) {
  checkValidity(file, task)
  const sFileTitle = utils.basename(file.title)
  const sTaskDescription = task.description

  return stringSimilarity.compareTwoStrings(sFileTitle, sTaskDescription)
}

/**
* Check if title and task have the required properties
*
* @param file - the file with its title
* @param task - the task with its description
*/
function checkValidity (file, task) {
  if (!file.hasOwnProperty('title')) {
    throw new Error('file.title not found')
  }
  if (!task.hasOwnProperty('description')) {
    throw new Error('task.description not found')
  }
}

module.exports = fileTitleTaskDescriptionSimiliarity
