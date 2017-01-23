const buster = require('buster')
const sinon = require('sinon')
const validateAdmin = require('../lib/validate-admin')

buster.testCase('validateAdmin', {
  setUp: function () {
    this.res = { send: this.stub(), json: this.stub(), status: this.stub() }
    this.res.status.returns(this.res)
    this.next = this.stub()
  },

  'should fail when user was not an admin': function () {
    const user = { name: '', password: '', isAdmin: false }
    validateAdmin({ decoded: user }, this.res, this.next)
    buster.assert.calledWith(this.res.json, sinon.match.has('success', false))
    buster.assert.calledWith(this.res.json, sinon.match.has('message'))
  },

  'should set response code to forbidden 403 when user was not an admin': function () {
    const user = { name: '', password: '', isAdmin: false }
    validateAdmin({ decoded: user }, this.res, this.next)
    buster.assert.calledWith(this.res.status, 403)
  },

  'should call next if user was an admin': function () {
    const user = { name: '', password: '', isAdmin: true }
    validateAdmin({ decoded: user }, this.res, this.next)
    buster.assert.called(this.next)
  }
})
