const buster = require('buster')

const tokens = require('../lib/tokens')
const config = require('../config')
const jwt = require('jsonwebtoken')

buster.testCase('tokens', {
  setUp: function () {
    this.userId = 42
  },

  'createToken': {
    setUp: function () {
      this.sign = this.stub(jwt, 'sign').yields(null, null)
    },

    'should call jwt sign to create token': function () {
      return tokens.createToken(this.userId).then(() => {
        buster.assert.calledWith(this.sign, { data: this.userId }, config.token.secret, { expiresIn: config.token.expiresIn })
      })
    },

    'should return the token calculated by jwt': function () {
      this.sign.yields(null, 'special token')
      return tokens.createToken(this.userId).then((tokenString) => {
        buster.assert.equals(tokenString, 'special token')
      })
    },

    'should reject when jwt fails with an error': function () {
      this.sign.yields(new Error('something went wrong'), null)
      return tokens.createToken(this.userId).catch((err) => {
        buster.assert(err)
      })
    }
  },

  'verifyToken': {
    setUp: function () {
      this.verify = this.stub(jwt, 'verify').yields(null, { data: null })
      this.tokenString = 'tokenString'
    },

    'should call jwt verify to validate the token': function () {
      return tokens.verifyToken(this.tokenString).then(() => {
        buster.assert.calledWith(this.verify, this.tokenString, config.token.secret)
      })
    },

    'should return the userId that was decoded from the token by jwt': function () {
      this.verify.yields(null, { data: this.userId })
      return tokens.verifyToken(this.tokenString).then((uid) => {
        buster.assert.same(uid, this.userId)
      })
    },

    'should reject if an error occured within jwt': function () {
      this.verify.yields(new Error('something went wrong'), null)
      return tokens.verifyToken(this.tokenString).catch((err) => {
        buster.assert(err)
      })
    }
  }
})
