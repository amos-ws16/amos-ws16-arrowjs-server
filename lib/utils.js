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

module.exports = { basename }
