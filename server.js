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

app.post('/api/addmember/member', async (req, res) => {
    const rawData = req.body
    await orm.addMember(rawData)
    // send a respond
    res.redirect('/index.html')
})

//=====================CATEGORY====================

//          adding Category
app.post('/api/addcategory', async (req, res) => {
    const data = req.body
    await orm.addCategory(data)
    res.redirect('/index.html')
})
//          delete Category
app.delete('api/deletecategory/:id', async (req, res) => {
    let id = req.params.id
    await orm.deleteCategory(id)
    res.redirect('/index.html')
})
//             update Category
app.put('api/updatecategory/:id', async (req, res) => {
    let data = req.body
    let id = req.params.id
    await orm.updateCategory(id, data)
    res.redirect('/index.html')
})
//===================END===================================


//======================Book============================

//                  addBook
app.post('api/addbook', async (req, res) => {
    let data = req.body
    await orm.addBook(data)
})
//                  updateBook
app.put('api/updatebook/:id', async (req, res) => {
    let data = req.body
    let id = req.params.id
    await orm.updateBook(id, data)
})
//                  deleteBook
app.delete('api/deletebook/:id', async (req, res) => {
    let id = req.params.id
    await orm.deleteBooks(id)
})

//                  viewBook by member
app.get('api/viewbook/member', async (req, res) => {
    await orm.viewBookMember()
})

//                  viewBook by name

app.get('api/viewbook/name', async (req, res) => {
    await orm.viewBookName()
    // need parameter for memeberName
})

//                  viewBook by category

app.get('api/viewbook/category', async (req, res) => {
    await orm.viewBookCategory()
    // need parameter for categoryName
})

// ===================END===================================


// Listener ==================================================
app.listen(PORT, function () {
    console.log(`Serving content on http://localhost:${PORT}`)
})
