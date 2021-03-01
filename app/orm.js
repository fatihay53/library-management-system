

const db = require('./connection')('library_managment_system', 'password123')

async function addCategory(input) {
    return db.query('INSERT INTO category (category_name,category_des) values (?)', [input.category_name,input.category_des])
}

async function deleteCategory(id) {
    return db.query(`DELETE FROM category WHERE id='${id}'`)

}

async function updateCategory(id,input) {
    return db.query(`UPDATE category SET category_name = '${input.category_name}' AND category_des='${input.category_des}' WHERE id = ${id}`)
}



module.exports = { addCategory, deleteCategory,updateCategory }

