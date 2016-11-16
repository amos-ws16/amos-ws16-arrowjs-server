/**
 * Returns the basename without extension of filename. If the filename does not
 * contain any dots it will be returned as is, otherwise the extension is
 * stripped and the basename is returned.
 *
 * @param filename - name of a file basename.ext
 */
function basename (filename) {
  let dotPosition = filename.lastIndexOf('.')
  return dotPosition === -1 ? filename : filename.substring(0, dotPosition)
}

/**
 * Returns 1.0 if the file's title without it's file extension matches
 * the tasks title exactly, 0.0 otherwise.
 *
 * @param file - an object that has a string property title
 * @param task - an object that has a string property title
 */
function sameTitlePlugin (file, task) {
  return basename(file.title) === task.title ? 1.0 : 0.0
}

module.exports = sameTitlePlugin
