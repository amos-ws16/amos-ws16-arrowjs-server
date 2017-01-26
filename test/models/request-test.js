const buster = require('buster')

const Request = require('../../lib/models/request')

buster.testCase('Request model', {
  'should be invalid if request object is missing': function () {
    let request = new Request()
    return request.validate()
      .catch((err) => {
        buster.refute.isNull(err, 'Error must be set')
        buster.assert.defined(err.errors.request)
      })
  },

  'should be invalid if response object is missing': function () {
    let request = new Request({ request: {} })
    return request.validate()
      .catch((err) => {
        buster.refute.isNull(err, 'Error must be set')
        buster.assert.defined(err.errors.response)
      })
  }
})
