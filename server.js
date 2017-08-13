const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Mjork!')
})

app.listen(3000, function () {
  console.log('Go to http://localhost:3000/')
})