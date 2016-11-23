const utils = require('../utils.js')
const stringSimilarity = require('string-similarity')
const keywordExtractor = require('keyword-extractor')

/**
 * First uses the keyword-extractor to get the keywords, then compares the keywords with stringSimilarity to get a context score
 *
 * @param file - the file with its title
 * @param task - the task with its description
 */
function fileTitleTaskDescriptionContex (file, task) {
  checkValidity(file, task)
  const sFileTitle = utils.basename(file.title)
  const sFileDescKeywords = getKeywords(sFileTitle)
  const sTaskDescKeywords = getKeywords(task.description)

  return stringSimilarity.compareTwoStrings(sFileDescKeywords, sTaskDescKeywords)
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

module.exports = fileTitleTaskDescriptionContex
