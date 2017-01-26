const Router = require('express-promise-router')
const postApiScore = require('./post-api-score')
const postApiAuth = require('./post-api-auth')
const postApiFeedback = require('./post-api-feedback')
const validateToken = require('./validate-token')
// const validateAdmin = require('./validate-admin')
const packageInfoServer = require('../package.json')
const packageInfoEngine = require('../node_modules/arrow/package.json')

const router = Router()

router.get('/welcome', (req, res) => {
  let changelogURLServer = 'https://github.com/amos-ws16/amos-ws16-arrowjs-server/blob/master/CHANGELOG.md'
  let changelogURLEngine = 'https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/CHANGELOG.md'
  let userGuideURL = 'https://github.com/amos-ws16/amos-ws16-arrowjs/blob/master/docs/user-guide.md'
  let message = '<!DOCTYPE html>\r\n' +
                '<html>\r\n<body>\r\n' +
                '<h1>Welcome to Arrow!</h1>\r\n' +
                '<h2>Server</h2>\r\n' +
                '<p>Version: ' + packageInfoServer.version + '</p>\r\n' +
                '<p>visit <a href="' + changelogURLServer + '">Changelog</a></p>\r\n' +
                '<h2>Engine</h2>\r\n' +
                '<p>Version: ' + packageInfoEngine.version + '</p>\r\n' +
                '<p>visit <a href="' + changelogURLEngine + '">Changelog</a></p>\r\n' +
                '<h2>UserGuide</h2>\r\n' +
                '<p>visit <a href="' + userGuideURL + '">User Guide</a></p>\r\n' +
                '</body>\r\n</html>'
  res.send(message)
})

// route to get a token
router.post('/auth', postApiAuth)
// secure by token
router.use(validateToken)
router.post('/score', postApiScore)
router.post('/feedback', postApiFeedback)

// // secure by admin rights (user management: list, add, remove)
// // TODO: extract userId from request to get isAdmin from DB
// router.use(validateAdmin)
// router.post('/admin', (res, req) => {
//   res.json({ success: true, message: 'Welcome Mr Admin!' })
// })

module.exports = router
