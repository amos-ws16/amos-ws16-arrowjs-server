const _ = require('lodash')
const defaults = require('./default')

module.exports = () => {
  const env = process.env.NODE_ENV || 'development'
  return _.merge({}, defaults, require(`./${env}`))
}
