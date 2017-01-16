
/*
 * This configuration file must be placed in the folder in which
 * the amos-ws16-arrowjs-server folder is placed.
 */

// URL for the dev and prod database. This database will NOT be deleted when
// running the database tests
const dev = 'mongodb://localhost:27017/amos-dev'
const prod = 'mongodb://localhost:27017/amos-prod'

// URL for test database which will be deleted / modified when running the
// buster tests
const test = 'mongodb://localhost:27017/amos-test'

module.exports = { dev, prod, test }
