const express = require('express')
const app = express()

const orm = require('./app/orm')


app.get('/add/member', function (req, res) {
  // the data is a string, need to parse to object
  const rawData = req.body
  const data = JSON.parse(rawData)
  orm.addMember(data)

  // send a respond
  res.send(data)
})