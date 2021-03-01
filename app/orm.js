const db = require('./connection')('library_managment_system', 'password123')

// the pramater is a object {memberID, firstName, lastName, phoneNum, email, address}
function addMember(info={}) {
  return db.query(`INSERT INTO ${tableName} (memberID, firstName, lastName, phoneNumber, email, address) VALUES (${info.memberID}, ${info.firstName}, ${info.lastName}, ${info.phoneNumber}, ${info.email}, ${info.address})`)
}

module.exports = {addMember}