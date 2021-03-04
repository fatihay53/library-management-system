const db = require('./connection')('library_managment_system', 'password123')



// ====================fatih=============================

//=================//CATEGORY============================

async function viewCategories() {
    return await db.query('SELECT * FROM category')
}
async function addCategory(input) {
    return db.query('INSERT INTO category (categoryName,categoryDes) values (?,?)', [input.categoryName, input.categoryDes])
}
async function getCategory(id) {
    return await db.query(`SELECT * FROM category where categoryID=${id}`)
}

async function deleteCategory(id) {
    await db.query(`DELETE FROM category WHERE categoryID=${id}`)
    let result = await db.query('SELECT * FROM category')

    return result

}


async function updateCategory(id, input) {
    return db.query(`UPDATE category SET categoryName = '${input.categoryName}', categoryDes='${input.categoryDes}' WHERE categoryID = ${id}`)
}

//==================================end==================================================





//===========================Books=======================================

async function getAvailableBook() {
    return db.query(`select B.bookID as bookID, B.bookName as bookName, B.author as author, 
    B.publishingYear as publishingYear, C.categoryName as categoryName from book B 
    left join category C  on B.categoryID = C.categoryID where B.memberID IS NULL;`)
}

async function addBook(input) {
    return db.query('INSERT INTO book (bookName,author,publishingYear,categoryID) values (?,?,?,?)',
        [input.bookName, input.author, input.publishingYear, input.categoryID])
}
async function updateBook(id, input) {
    return db.query(`UPDATE book SET bookName = '${input.bookName}', author='${input.author}',
    publishingYear=${input.publishingYear},memberID=${input.memberID},categoryID=${input.categoryID},barrowDate=${input.barrowDate} WHERE bookID=${id}`)
}
async function deleteBooks(id) {
    return db.query(`DELETE FROM book WHERE bookID='${id}'`)
}

async function viewBookMember() {
    return db.query('SELECT * FROM book left join member on memberID=book.bookID')
}
async function viewBookName() {
    return db.query('SELECT * FROM book left join member on memberID=book.bookID where member.firstName="XX" ')
}
async function viewBookCategory() {
    return db.query('SELECT * FROM book left join category on categoryID=category.categoryID where categoryName="XX" ')
}

function searchBook(name) {
    return db.query(
        `SELECT * FROM book WHERE bookName REGEXP '.*${name}.*'`)
}
// ==================================== Member ======================================
// =======================================Faisal==========================================
// to return a record by passing memberID
async function getMember(id) {
    return db.query(`SELECT * FROM member where memberID = ${id}`)
}
// =======================================Faisal==========================================
// to return a record by passing memberID

async function getMember(id) {
    return db.query(`SELECT * FROM member where memberID = ${id}`)
}

// =======================================Faisal=================================

// update when member returns book

async function returnBook(bookID) {
    return db.query(`update book set memberID = null, borrowDate = null where bookID = ${bookID};`)
}


// get borrowed books by memberID

async function getBorrowedBooksByMemberID(memberID) {
    return db.query(`SELECT bookID, bookName, author, DATE_FORMAT(borrowDate, "%W %M %e %Y") as borrowDate from book where memberID = ${memberID}`)
}

// Update book when members borrows
async function borrowBook(bookID, memberID, borrowDate) {
    return db.query(`update book set memberID = ${memberID}, borrowDate = ${borrowDate} where bookID = ${bookID};`)
}
// to get all member from the database
async function getMembers() {
    return db.query("SELECT * FROM member")
}

// the pramater is a object {firstName, lastName, phoneNum, email, address}
// ---- George ----
async function addMember(data) {
    let result = await db.query(
        'INSERT INTO member (firstName, lastName, phoneNumber, email, address) VALUES (?,?,?,?,?)',
        [data.firstName, data.lastName, data.phoneNumber, data.email, data.address])
}

// ===================== update number ----George ============================
async function updateMember(id, data) {
    let result = await db.query(
        `
        UPDATE member
        SET firstName='${data.firstName}',lastName='${data.lastName}',phoneNumber=${data.phoneNumber},email='${data.email}',address='${data.address}'
        WHERE memberID = ${id};
        `
    )
}

// -------- delete member (George) --------
async function deleteMember(id) {
    return await db.query(`DELETE FROM member WHERE memberID=${id};`)
}
// ================================= Member End ==============================


async function getCategoriesList() {
    return db.query("SELECT * FROM category")
}

module.exports = { searchBook, returnBook, getBorrowedBooksByMemberID, borrowBook, getAvailableBook, viewCategories, getCategoriesList, updateMember, addMember, getMembers, getMember, deleteMember, getCategory, addCategory, deleteCategory, updateCategory, addBook, updateBook, deleteBooks, viewBookMember, viewBookName, viewBookCategory }


