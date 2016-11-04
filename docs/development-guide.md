# Guidelines for development

## Directory structure

    <project root>
    ├── bin
    │   └── cli.js
    ├── docs
    │   ├── api
    │   │   ├── module1.md
    │   │   └── module2.md
    │   ├── examples.md
    │   ├── guides.md
    │   └── tutorials.md
    ├── lib
    │   ├── module1-model.js
    │   ├── module1.js
    │   └── module2.js
    └── test
        ├── buster.js
        ├── module1
        │   ├── submodule1-test.js
        │   └── submodule2-test.js
        └── module2-test.js

## Setup

    $ git clone git@github.com:amos-ws16/amos-ws16-aibot.git
    $ cd amos-ws16-aibot
    $ npm install
    $ npm test

## Coding standards

All code needs to conform to the
[standard.js](https://github.com/feross/standard) code guidelines and
additionally all classes, methods and functions must provide a `jsdoc`
documentation ([require-jsdoc](http://eslint.org/docs/rules/require-jsdoc)).
These rules will be checked with eslint on each `npm test` and push to the
github repository by Travis-CI.

## Tests

Tests are written with [buster.js](http://docs.busterjs.org/en/latest/). For
testing of [express.js](http://expressjs.com) based REST functionality use
[supertest](https://github.com/visionmedia/supertest).

## Working with version control

 + [Keep commits clean](https://www.reviewboard.org/docs/codebase/dev/git/clean-commits/)
 + [Write good discriptions](https://www.reviewboard.org/docs/codebase/dev/writing-good-descriptions/)

## Development vs. Production

To make work easier and more comfortable there are two different modes for the code. These are `development`
mode and `production mode`. `development` mode can be used for e.g. avoiding to use a token to use the API.
To start the server in `development` mode enter

    $ npm run dev

To run in `production` mode simply type

    $ npm start

The development mode is stored in (and can be accessed by) `process.env.NODE_ENV`.

## Miscellaneous Commands

Automatically fix all files (ESLint):

    $ npm run eslint
