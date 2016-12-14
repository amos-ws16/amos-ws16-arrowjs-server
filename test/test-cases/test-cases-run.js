const buster = require('buster')
const request = require('supertest')
const fs = require('fs')
const Table = require('cli-table')
const app = require('../../lib')

let allTestCases = {}
// allTestCases get loaded
allTestCases = getAllTestCases()

var hitCounter = 0
var length = 0
var table = new Table({
  head: ['TestCase file', 'größter Score', 'Index'],
  chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
  style: {head: ['green'], border: ['grey']}
})

for (let key in allTestCases) {
  var testCases = allTestCases[key]
  length += testCases.length
  for (let testCase of testCases) {
    request(app)
      .post('/api/score')
      .send(testCase)
      .end(function (err, res) {
        buster.refute(err)

        let biggestAIndex = 0
        let biggestAScore = 0
        for (let j in res.body.result) {
          if (res.body.result[j].total > biggestAScore) {
            biggestAIndex = j
            biggestAScore = res.body.result[j].total
          }
        }
        if (biggestAIndex === '0') {
          hitCounter++
        }
        table.push([key, biggestAScore, biggestAIndex])
      })
  }
}
// Timeout needed because supertest runs tests asynchronously and nesting callbacks for 60 tests wouldn't be feasible.
// No better workaround found than waiting 3 seconds until hopefully all asynchronous tests have run through.
setTimeout(function () {
  const hitRate = hitCounter / length
  console.log(table.toString())
  console.log('Länge: ' + length)
  console.log('Hits: ' + hitCounter)
  console.log((hitRate * 100) + '% wurden korrekt bewertet.')
  console.log('______________________________________')
}, 3000)

/**
*dynamic loads of all testcases in the folder ('./test/test-cases') with the format of <NAME>-test-cases.js
*/
function getAllTestCases () {
  let testCasesSet = {}
  let files = fs.readdirSync('./test/test-cases')
  for (let file of files) {
    if (file.substring(file.length - 13, file.length) === 'test-cases.js') {
      testCasesSet[file] = require('./' + file.substring(0, file.length - 3)).testCases
    }
  }
  return testCasesSet
}