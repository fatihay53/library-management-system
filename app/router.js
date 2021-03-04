// var express = require('express');
// var router = express.Router()
const orm = require('./orm');


function router(app) {
    // ======================= Member ===================================
    // show all members
    app.get('/api/members', async function (req, res) {
        const membersList = await orm.getMembers()


        res.send(membersList)
    })

    // to get memeber info by passing 

    app.get('/api/member/:memberID', async function (req, res) {
        const id = req.params.memberID
        const member = await orm.getMember(id)
        res.send(member)
    })

    // add new member
    app.post('/api/addmember/member', async (req, res) => {
        const rawData = req.body
        await orm.addMember(rawData)
        res.redirect('/allmembers.html')
    })

    // edit a member whose id is 'memberID'
    app.post('/api/member/:memberID/update', function (req, res) {
        console.log('catching update url...')
        const id = parseInt(req.params.memberID)
        const data = req.body
        orm.updateMember(id, data)
        res.redirect('/allmembers.html')
    })

    app.get('/api/members', async function (req, res) {
        const membersList = await orm.getMembers()
        console.log(`[GET /api/quote] membersList`)
        res.send(membersList)
    })

    app.delete('/api/member/:id', function (req, res) {

        const memberId = req.params.id
        console.log(`[deleteMember]: ${memberId}`)
        let result = orm.deleteMember(memberId)
        res.send(result)

    })
    // ======================== Member End ==============================


    //==================== Book ======================

    // get borrowed books by memeberID - Faisal


    app.get('/api/getborrowedbooks/:memberID', async function (req, res) {
        const memberID = req.params.memberID

        const books = await orm.getBorrowedBooksByMemberID(memberID)
        console.log("book is found")
        res.send(books)
    })



    // app.use(function (req, res) {
    //     res.status(404).render('/index.html');
    // });

    // Update book when member borrows  - Faisal

    app.put("/api/borrow", async function (req, res) {
        const bookID = req.body.bookID.trim();
        const memberID = req.body.memberID.trim();
        const borrowDate = req.body.borrowDate.trim();
        console.log(bookID, memberID, borrowDate)
        const result = await orm.borrowBook(bookID, memberID, borrowDate)

        console.log("book has been updated")
        // windows.location.href = "/index.html"
        // res.redirect('/index.html')
        res.send({ status: true })

    });

    // Update book when member return book - Faisal

    app.put("/api/return", async function (req, res) {
        const bookID = req.body.bookID.trim();
        console.log(bookID)
        const result = await orm.returnBook(bookID)
        console.log("book has been returned")
        res.send({ status: true })
        // res.redirect('/index.html')
    });


    app.get('/api/availablebooks', async function (req, res) {
        const availableBooksList = await orm.getAvailableBook()
        console.log(`[GET /api/quote] availableBooksList`)
        res.send(availableBooksList)
    })

    app.get('/api/categoriesList', async function (req, res) {
        const categoriesList = await orm.getCategoriesList()
        console.log(`[GET /api/quote] categoriesList`)
        res.send(categoriesList)
    })

    app.get('/api/book/search/:name', async function (req, res) {
        const name = req.params.name.trim()
        console.log("[searchBook] ", name)
        const bookLst = await orm.searchBook(name)
        res.send(bookLst)
    })

    //=====================CATEGORY====================

    //          adding Category
    app.post('/api/addcategory', async (req, res) => {
        const data = req.body
        console.log(data)
        let result = await orm.addCategory(data)

        res.redirect('/allcategory.html')
    })
    //          delete Category
    app.delete('/api/deletecategory/:id', async (req, res) => {
        let id = req.params.id
        // console.log(id)
        let result = await orm.deleteCategory(id)
        res.send(result)

    })
    //             update Category

    app.post('/api/category/:id/update', async (req, res) => {

        let data = req.body
        let id = req.params.id
        let result = await orm.updateCategory(id, data)

        res.redirect('/allcategory.html')

    })

    //              category get by ID
    app.get('/api/category/:id', async (req, res) => {
        let id = req.params.id
        let result = await orm.getCategory(id)
        console.log(result)
        res.send(result)
    })

    //              category GET list

    app.get('/api/categories', async (req, res) => {
        const data = await orm.viewCategories()
        res.send(data)


    })
    //===================END===================================


    //======================Book============================


    //                  addBook
    app.post('/api/addbook', async (req, res) => {
        const bookData = req.body
        await orm.addBook(bookData)
        res.redirect('/index.html')
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
    });


    // ===================END===================================




}
module.exports = router
