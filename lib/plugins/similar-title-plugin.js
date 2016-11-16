const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')

/**
 * Returns a comparing score of two strings based on Dice's Coefficient using the stringSimilarity module
 *
 * @param file - the file title as string
 * @param task - the task as string
*/
function titleContext (file, task) {
  const ititle = utils.basename(file.title)
  let similarityScore = stringSimilarity.compareTwoStrings(ititle, task.title)

  return similarityScore
}

module.exports = titleContext
