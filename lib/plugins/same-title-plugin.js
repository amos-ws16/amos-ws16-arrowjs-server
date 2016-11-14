/**
 * Returns 1.0 iff the file's title without it's file extension matches
 * the tasks title exactly, 0.0 otherwise.
 */
function sameTitlePlugin (file, task) {
  return file.title.split('.')[0] === task.title ? 1.0 : 0.0
}

module.exports = sameTitlePlugin
