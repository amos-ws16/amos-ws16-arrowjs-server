const express = require('express')
var app = express()
let PORT = process.env.PORT || 3000

app.get('/Welcome', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, function () {
  console.log(`Server started on Port: ${PORT}`)
})
