const mongoose = require('mongoose')

/**
 * Return a URI string in the standard mongoose URI format given the provided
 * configuration object, i.e. mongodb://username:password@host:port/database.
 * @param config - an object with the fields host, dbName (required), user,
 *                 password, and port (optional)
 */
function generateUri (config) {
  const port = config.port || 27017
  const userPart = ((user, password) => {
    if (user && password) {
      return `${user}:${password}@`
    }
    if (user) {
      return `${user}@`
    }
    if (password) {
      throw new Error('Database config: password without username')
    }
    return ''
  })(config.user, config.password)

  return `mongodb://${userPart}${config.host}:${port}/${config.dbName}`
}

/**
 * Return a then-able promise that resolves when the connection was
 * successfully established using the given config and rejects when there was
 * an error while connecting.
 * @param config - an object with the fields host, dbName (required), user,
 *                 password, and port (optional)
 */
function connect (config) {
  const uri = generateUri(config)
  return mongoose.connect(uri)
  // const connection = mongoose.createConnection(uri)
  // return new Promise((resolve, reject) => {
  //   connection.once('error', (stream) => {
  //     reject(stream)
  //   })
  //   connection.once('open', (stream) => {
  //     resolve(stream)
  //   })
  // })
}

module.exports = { connect, generateUri }
