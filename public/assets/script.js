
// fetch url from server and get respond
// async function addMember(info) {
//     return await fetch('/add/member', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(info),
//     })
// }

// get all the new member info from form and call server
// function addmember() {
//     // memberInfo is a object {memberID, firstName, lastName, phoneNum, email, address}
//     let memberInfo = {}
//     memberInfo['memberID'] = 1
//     memberInfo['firstName'] = ''
//     memberInfo['lastName'] = ''
//     memberInfo['phoneNumber'] = ''
//     memberInfo['email'] = ''
//     memberInfo['address'] = ''
//     addMember(memberInfo).then(
//         // a rander function should be here
//     )
// }

// fetch url from server and get respond

//  get api for adding book
async function getBookInfo() {
    const data = await fetch('api/addbook').then(r => r.json())

    document.querySelector('#bookList').innerHTML = ''
    data.forEach(input => {
        document.querySelector('#bookList').innerHTML += `
    
    ${input.bookName}
    ${input.author}
    ${input.publishingYear}
    ${input.memberID}
    ${input.categoryID}
    ${input.barrowDate}
    // CARD will be past here 

    `

    })
}
getBookInfo()

async function editBook() {
    const editData = {
        headers: { 'Content-Type': 'application/json' },
        method: 'get',

    }
    const data = await fetch(`api/updatebook/${id}`).then(r => r.json())
    getBookInfo()

    document.querySelectora('#').value = data[0].bookName
    document.querySelectora('#').value = data[0].author
    document.querySelectora('#').value = data[0].publishingYear
    document.querySelectora('#').value = data[0].memberID
    document.querySelectora('#').value = data[0].categoryID
    document.querySelectora('#').value = data[0].barrowDate


}




