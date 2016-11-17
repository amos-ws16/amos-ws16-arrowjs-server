// test/my-module-test.js
const buster = require('buster')

const myModule = require('../lib/my-module')
const fancyLib = require('../lib/fancy-lib')

buster.testCase('My Module', {
  'should return one more than fancy-lib': function () {
    this.stub(fancyLib, 'getFancyWorkDone').returns(1)

    let result = myModule.doSomethingUseful()

    buster.assert.equals(result, 2)
  }
})
