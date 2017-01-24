/** */
function errorHandler (err, req, res, next) {
  if (['SyntaxError', 'InvalidInputError'].includes(err.name)) {
    res.json({ success: false, message: addErrorName(err) })
    next()
    return
  }

  next(err)
}

/** */
function addErrorName (err) {
  if (err.name === 'InvalidInputError') {
    return `Configuration Error: ${err.message}`
  }
  return `Syntax Error: ${err.message}`
}

module.exports = { errorHandler, addErrorName }
