/**
  Handle different errors and send them as a response
*/
function errorHandler (err, req, res, next) {
  if (['SyntaxError', 'InvalidInputError'].includes(err.name)) {
    res.json({ success: false, message: addErrorName(err) })
    next()
    return
  }
  next(err)
}

/**
  Add the type/name of an error to the message
  @param err - an error
  @return a string containing the error name and message
*/
function addErrorName (err) {
  if (err.name === 'InvalidInputError') {
    return `Configuration Error: ${err.message}`
  }
  return `Syntax Error: ${err.message}`
}

module.exports = { errorHandler, addErrorName }
