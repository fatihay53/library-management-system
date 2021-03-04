const express = require('express')
const app = express()

const apirouter = require('./app/router')



const PORT = process.env.PORT || 8088

// will share any static html files with the browser
app.use(express.static('public'))
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

apirouter(app)

// Listener ==================================================
app.listen(PORT, function () {
    console.log(`Serving content on http://localhost:${PORT}`)
})
