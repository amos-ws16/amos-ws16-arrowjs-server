/** Return [ head, tail ] of path. */
function splitPath (path) {
  let p = path.indexOf('.')
  return p < 0 ? [path, ''] : [path.substring(0, p), path.substring(p + 1)]
}

/** Extract subobject from obj defined by path. */
function extractObject (obj, path) {
  while (path !== '') {
    let [ key, rest ] = splitPath(path)
    if (key.endsWith('[]')) key = key.substring(0, key.length - 2)

    if (Array.isArray(obj)) {
      obj = obj.map(element => element[key])
    } else {
      obj = obj[key]
    }

    path = rest
  }
  return obj
}

module.exports = extractObject
