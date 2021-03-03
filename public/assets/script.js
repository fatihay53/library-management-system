
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




// Call the server and get all members
async function getAllMembers() {
    const members = await fetch('/api/members').then(r => r.json())

    document.querySelector('#membersList').innerHTML = ''
    for (i = 0; i < members.length; i++) {
        document.querySelector('#membersList').innerHTML += `
        <div class="card col-xl-5" style="margin-bottom: 20px; margin-right: 30px; margin-left: 20px;"> <!-- card starts here-->
        <div class="card-header">
        Member ID: <span id="memberID">${members[i].memberID}</span>
        </div>
        <div class="card-body">
            <p style="display: inline;">First Name: </p><span id="firstName">${members[i].firstName}</span>
            <br>
            <p style="display: inline;">Last Name: </p><span id="lastName">${members[i].lastName}</span>
            <br>
            <p style="display: inline;">Phone Number: </p><span id="phoneNumber">${members[i].phoneNumber}</span>
            <br>
            <p style="display: inline;">Email: </p><span id="email">${members[i].email}</span>
            <br>
            <p style="display: inline;">Address: </p><span id="email">${members[i].address}</span>
            <br>
            <div class="float-end">
                <a href="#" class="btn btn-secondary">Delete</a>
                <a href="editmember.html#${members[i].memberID}" class="btn btn-secondary" onclick="getMemberByID(${members[i].memberID})">Edit</a>
                <a href="borrowbook.html#${members[i].memberID}" class="btn btn-secondary">Borrow book</a>
            </div>
        </div> <!--card body ends here-->
    </div> <!-- Column/Card ends here -->`
    }
}


getAllMembers()

async function getAllCategories() {
    const categories = await fetch('/api/categories').then(r => r.json())
    console.log(categories)
    document.querySelector('#categoryList').innerHTML = ''
    categories.forEach(data => {
        document.querySelector('#categoryList').innerHTML += `<div class="card col-xl-5" style="margin-bottom: 20px; margin-right: 30px; margin-left: 20px;">
        <!-- card starts here-->
        <div class="card-header">
        
            Category ID: <span id="categoryID">${data.categoryID}</span>
        </div>
        <div class="card-body">
            <p style="display: inline;">Category Name: </p><span id="categoryName">${data.categoryName}</span>
            <br>
            <p style="display: inline;">Category Description: </p><span id="categoryDes">${data.categoryDes}</span>
            <br>       
            <div class="float-end">
            <button onClick="deleteCategory('${data.categoryID}')" class="card-link btn btn-danger btn-sm">Delete</button>
            <button onClick="editCategory('${data.categoryID}')" class="card-link btn btn-primary btn-sm">Edit</button>
                <a href="#" class="btn btn-secondary">Borrow book</a>
            </div>
          
        </div>
        <!--card body ends here-->
    </div> <!-- Column/Card ends here -->`
    })
}
{/* <form action='/api/category/${data.categoryID}' method="POST"></form>  */ }
getAllCategories()

async function deleteCategory(id) {

    const fetchOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'delete'
    }
    const result = await fetch(`/api/deletecategory/${id}`, fetchOptions).then(r => r.json())
    // reload the quotes with the deleted ones now gone
    getAllCategories()
}

async function editCategory(id) {
    alert(`editing ${id}`)
    const fetchOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'put'
    }
    const result = await fetch(`/api/updatecategory/${id}`, fetchOptions).then(r => r.json())
    getAllCategories()
}




    // const editData = {
    //     headers: { 'Content-Type': 'application/json' },
    //     method: 'get',

    // }
    // const result = await fetch(`/api/contact/${id}`, editData).then(res => res.json())
    // document.getElementById('firstName').value = result[0].first_name
    // document.getElementById('lastName').value = result[0].last_name
    // document.getElementById('phoneNumber').value = result[0].phone_number

