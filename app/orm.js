const db = require('./connection')('library_managment_system', 'password123')



// ====================fatih=============================

//=================//CATEGORY============================
async function addCategory(input) {
    return db.query('INSERT INTO category (categoryName,categoryDes) values (?)', [input.categoryName, input.categoryDes])
}

async function deleteCategory(id) {
    return db.query(`DELETE FROM category WHERE id='${id}'`)

}

async function updateCategory(id, input) {
    return db.query(`UPDATE category SET categoryName = '${input.categoryName}', categoryDes='${input.categoryDes}' WHERE id = ${id}`)
}

//==================================end==================================================

// ===============================george==================================================
// the pramater is a object {memberID, firstName, lastName, phoneNum, email, address}
async function addMember(data) {
    let result = await db.query('INSERT INTO member (firstName, lastName, phoneNumber, email, address) VALUES (?,?,?,?,?)',
        [data.firstName, data.lastName, data.phoneNumber, data.email, data.address])
    console.log(result)
}
// ================================end==================================================



//===========================Books=======================================
async function addBook(input) {
    return db.query('INSERT INTO book (bookName,author,publishingYear,memberID,categoryID,barrowDate) values (?)',
        [input.bookName, input.author, input.publishingYear, input.memberID, input.categoryID, input.barrowDate])
}
async function updateBook(input){
    
}

module.exports = { addMember, addCategory, deleteCategory, updateCategory,addBook }

