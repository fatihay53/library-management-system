const express = require('express')
const app = express()

const orm = require('./app/orm')

const PORT = process.env.PORT || 333

// will share any static html files with the browser
app.use(express.static('public'))

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get( '/api/members', async function( req, res ){
    const membersList = await orm.getMembers()
    console.log( `[GET /api/quote] membersList` )
    res.send(membersList)
})

// to get memeber info by passing memberID
app.get( '/api/member/:memberID', async function( req, res ){
    const id = req.params.memberID

    const member = await orm.getMember( id )

    res.send( member)
})

app.post('/api/addmember/member', async function (req, res) {
    // the data is a string, need to parse to object
    const rawData = req.body
    // const data = JSON.parse(rawData)
    console.log(rawData)
    let result = await orm.addMember(rawData)

    // send a respond
    res.redirect('/index.html')
    // res.send(data)
    console.log(result)
})



// Routes (Endpoints) =========================================
// app.get('/api/category', async function (req, res) {
//     const categoryList = await db.query("SELECT * FROM category")
//     // console.log(`[GET /api/category] categoryList ${categoryList}`)
//     res.send(categoryList)
// })

// app.post('/api/category', async function (req, res) {
//     const categoryData = req.body
//     console.log(categoryData)
//     const result = await db.query(`INSERT INTO category (categoryName,categoryDes) VALUES(?,?)`,
//         [categoryData.categoryName, categoryData.categoryDes])
//     // console.log(`[POST /api/category] categoryData.result`, categoryData, result)

//     // if we are using RESTful javascript call we can send JSON data back
//     // res.send( { message: "Quote sent!"} )
//     // if we are doing a FORM POST direclty, we need to redirect to the index page.
//     res.redirect('/index.html')
// })


// Listener ==================================================
app.listen(PORT, function () {
    console.log(`Serving content on http://localhost:${PORT}`)
})
