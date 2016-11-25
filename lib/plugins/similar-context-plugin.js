const stringSimilarity = require('string-similarity')
const keywordExtractor = require('keyword-extractor')
const utils = require('../utils.js')

/**
 * First uses the keyword-extractor to get the keywords, then compares the keywords with stringSimilarity to get a context score
 *
 * @param file - the file with its description
 * @param task - the task with its description
 */
function similarContextPlugin (sString1, sString2) {
  utils.isString(sString1)
  utils.isString(sString2)
  const sKeywords1 = getKeywords(sString1)
  const sKeywords2 = getKeywords(sString2)

  return stringSimilarity.compareTwoStrings(sKeywords1, sKeywords2)
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

module.exports = similarContextPlugin
