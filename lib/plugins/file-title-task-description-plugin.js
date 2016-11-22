const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')
const keywordExtractor = require('keyword-extractor')

/**
 * Uses the string-similarity module to compare the file title and the task description
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
exports.fileTitleTaskDescriptionSimiliarity = function (file, task) {
  const sFileTitle = utils.basename(file.title)
  const sTaskDescription = task.description

  let iSimilarityScore = stringSimilarity.compareTwoStrings(sFileTitle, sTaskDescription)

  return iSimilarityScore
}

/**
 * First uses the keyword-extractor to get the keywords, then compares the keywords with stringSimilarity to get a context score
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
exports.fileTitleTaskDescriptionContex = function (file, task) {
  const sFileDescKeywords = getKeywords(file.title)
  const sTaskDescKeywords = getKeywords(task.description)

  let iContextScore = stringSimilarity.compareTwoStrings(sFileDescKeywords, sTaskDescKeywords)

  return iContextScore
}

/**
* Uses the keyword-extractor module to get the keywords from the description and then joins the array to a string
*
* @param description - as string
*/
function getKeywords (description) {
  return keywordExtractor.extract(description, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  }).join(' ')
}
