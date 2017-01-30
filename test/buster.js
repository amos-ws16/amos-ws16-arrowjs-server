var config = module.exports

config['shared'] = {
  rootPath: '../',
  environment: 'node' // or 'browser'
}

config['Unit Tests'] = {
  extends: 'shared',
  tests: [
    'test/**/*-test.js',
    '!test/test-cases/*.js',
    '!test/end-to-end/*.js'
  ]
}

config['E2E Tests'] = {
  extends: 'shared',
  tests: [
    'test/end-to-end/*.js'
  ]
}

config['All Tests'] = {
  extends: 'shared',
  tests: [
    'test/**/*-test.js',
    'test/**/*-e2e.js',
    '!test/test-cases/*.js'
  ]
}

