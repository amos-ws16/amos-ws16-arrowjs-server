const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')

/**
 *
 *@param file - the file with its title
 *@param task - the task with its description
 */
exports.fileTitleTaskDescriptionSimiliarity = function (file, task) {
  const iFileTitle = utils.basename(file.title)
  const iTaskDesc = task.Description

  let similarityScore = stringSimilarity.compareTwoStrings(iFileTitle, iTaskDesc)

  return similarityScore
}
