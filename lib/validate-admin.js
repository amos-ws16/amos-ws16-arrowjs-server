/**
 * Middleware that only allows users to pass that have their isAdmin flag set.
 */
function validateAdmin (req, res, next) {
  const user = req.decoded
  if (!user.isAdmin) {
    res.status(403).json({ success: false, message: `Permission denied: ${JSON.stringify(user.sub)}` })
    return
  }

  next()
}

module.exports = validateAdmin
