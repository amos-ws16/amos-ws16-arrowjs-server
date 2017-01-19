/**
 * Middleware that only allows users to pass that have their isAdmin flag set.
 */
function validateToken (req, res, next) {
  const user = req.decoded
  if (!user.isAdmin) {
    res.status(403).json({ success: false, message: 'Permission denied' })
    return
  }

  next()
}

module.exports = validateToken
