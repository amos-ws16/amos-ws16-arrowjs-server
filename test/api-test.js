const buster = require('buster')
const postApiScore = require('../lib/server/post-api-score')
const scoreManager = require('../lib/score-manager')

buster.testCase('postApiScore', {
  'should use scoreManager\'s create function': function () {
    let fakeScoreManager = { score: this.stub() }
    let create = this.stub(scoreManager, 'create').returns(fakeScoreManager)

    let req = { body: {} }
    let res = { send: this.stub(), json: this.stub() }
    postApiScore(req, res)
    buster.assert.called(create)
  }
})
