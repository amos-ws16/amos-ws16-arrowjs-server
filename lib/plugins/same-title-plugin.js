const utils = require('../utils.js')

/**
 * Returns 1.0 if the file's title without it's file extension matches
 * the tasks title exactly, 0.0 otherwise.
 *
 * @param file - an object that has a string property title
 * @param task - an object that has a string property title
 */
function sameTitlePlugin (file, task) {
  return utils.basename(file.title) === task.title ? 1.0 : 0.0
}

module.exports = sameTitlePlugin
