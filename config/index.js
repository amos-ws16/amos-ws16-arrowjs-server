const _ = require('lodash')
const defaults = require('./default')
const configEnv = process.env.NODE_ENV || 'development'
const config = require(`./${configEnv}`)

module.exports = _.merge({}, defaults, config)

