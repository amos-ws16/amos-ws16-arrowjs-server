# Change Log
All notable changes to this project will be documented in this file.

## [Unreleased](https://github.com/amos-ws16/amos-ws16-arrowjs/compare/sprint-03-release...HEAD)

### Added
- [Changelog](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/CHANGELOG.md)
- [ScoreManager](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/score-aggregator.js) and [ScoreAggregator](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/score-aggregator.js)
- Automatic deployment with TravisCI ([Documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/aws-codedeploy.md))
- [Example](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/14) of testing with stubs ([Documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/development-guide.md#mockingstubbing-dependencies-in-tests))
- Scoring Plugins:
  - by [Time](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/close-time-plugin.js)
  - by [same](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/same-title-plugin.js) or [similar](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/lib/plugins/similar-title-plugin.js) title of task and file

### Changed
- Converted initial draft of title comparison into a [plugin](https://github.com/amos-ws16/amos-ws16-arrowjs/pull/18) for the ScoreManager

### Fixed

### Removed

## [1.0.0](https://github.com/amos-ws16/amos-ws16-arrowjs/releases/tag/sprint-03-release) - 2016-11-10

### Added
- Deployment Scripts for AWS ([incl.](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/aws-codedeploy.md) [documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/aws-server-setup.md))
- Added basic API
  - Endpoint for "Hello World"
  - Endpoint returning a hard-coded token
- Automatic Testsuit for new commits ([documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/development-guide.md#tests))
- `NODE_ENV` variable to start server in `development` or `production` mode ([documentation](https://github.com/amos-ws16/amos-ws16-arrowjs/blob/dev/docs/development-guide.md#development-vs-production))
- ES6 support
- Initial draft to compare strings
