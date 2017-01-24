/** */
function errorHandler (err, req, res, next) {
  if (err.name === 'SyntaxError') {
    res.json({ success: false, message: 'SyntaxError' })
    next()
    return
  }

  next(err)
}

module.exports = errorHandler

