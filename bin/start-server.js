'use strict'

const config = require('../config')
const app = require('../lib')(config())

app.start()
