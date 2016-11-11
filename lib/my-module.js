// lib/my-module.js
const fancyLib = require('./fancy-lib')

/** Does something useful and returns the result. */
function doSomethingUseful () {
  return fancyLib.getFancyWorkDone() + 1
}

module.exports = { doSomethingUseful }
