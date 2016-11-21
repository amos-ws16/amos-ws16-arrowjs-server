const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')

/**
 * Uses the string-similarity module to compare the file title and the task description
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
exports.fileTitleTaskDescriptionSimiliarity = function (file, task) {
  const iFileTitle = utils.basename(file.title)
  const iTaskDesc = task.Description

  let similarityScore = stringSimilarity.compareTwoStrings(iFileTitle, iTaskDesc)

  return similarityScore
}

/**
 * Uses the string-similarity module to compare the file description and the task description
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
exports.fileDescriptionTaskDescriptionSimiliarity = function (file, task) {
  const iFileDesc = file.Description
  const iTaskDesc = task.Description

  let similarityScore = stringSimilarity.compareTwoStrings(iFileDesc, iTaskDesc)

  return similarityScore
}
