const stringSimilarity = require('string-similarity')
const keywordExtractor = require('keyword-extractor')
const utils = require('../utils.js')

/**
 * Param 'extractKeywords' by default false:
 * Returns a comparing score of two strings based on Dice's Coefficient using the stringSimilarity module.
 *
 * If param 'extractKeywords' is true: first uses the keyword-extractor to get the keywords, then compares the keywords with stringSimilarity to get a context score
 *
 * @param file - the file with its description
 * @param task - the task with its description
 * @param extractKeywords - parameter for extracting the keywords (true - extract keyword before calculating similarity score, false - whithout extraction)
 */
function similarityPlugin (sString1, sString2, extractKeywords) {
  if ((extractKeywords === false) || (typeof extractKeywords === 'undefined')) {
    return stringSimilarity.compareTwoStrings(sString1, sString2)
  }

  if (extractKeywords === true) {
    utils.isValidString(sString1)
    utils.isValidString(sString2)
    const sKeywords1 = getKeywords(sString1)
    const sKeywords2 = getKeywords(sString2)

    return stringSimilarity.compareTwoStrings(sKeywords1, sKeywords2)
  }
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

module.exports = similarityPlugin
