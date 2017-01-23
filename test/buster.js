var config = module.exports

config['Unit Tests'] = {
  rootPath: '../',
  environment: 'node', // or 'browser'
  tests: [
    'test/**/*-test.js',
    '!test/test-cases/*.js',
    '!test/end-to-end/*.js'
  ]
}

config['E2E Tests'] = {
  rootPath: '../',
  environment: 'node', // or 'browser'
  tests: [
    'test/end-to-end/*.js'
  ]
}
