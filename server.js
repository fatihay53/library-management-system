const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const db = require( './app/connection' )('quotes_db','Winter2021')

// will share any static html files with the browser
app.use( express.static('html') )

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes (Endpoints) =========================================
app.get( '/api/category', async function( req, res ){
    const categoryList = await db.query( "SELECT * FROM category" )
    console.log( `[GET /api/category] categoryList ${categoryList}` )
    res.send(categoryList)
})

app.post( '/api/category', async function( req, res ){
    const categoryData = req.body
    console.log(categoryData)
    const result = await db.query( `INSERT INTO category (categoryName,categoryDes) VALUES(?,?)`, 
        [categoryData.categoryName, categoryData.categoryDes] )
    console.log( `[POST /api/category] categoryData.result`, categoryData, result )
    
    // if we are using RESTful javascript call we can send JSON data back
    // res.send( { message: "Quote sent!"} )
    // if we are doing a FORM POST direclty, we need to redirect to the index page.
    res.redirect( '/index.html' )
})


// Listener ==================================================
app.listen(PORT, function() {
    console.log(`Serving content on http://localhost:${PORT}`)
})
