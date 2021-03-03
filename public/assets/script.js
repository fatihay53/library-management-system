// ======================== get api for adding book ============================
async function getBookInfo() {
    console.log('Running getBookInfo....')
    const data = await fetch('api/addbook').then(r => r.json())
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


// =========================== Edit book ================================
async function editBook() {
    const editData = {
        headers: { 'Content-Type': 'application/json' },
        method: 'get'
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
                <a href="#" onclick="deleteMember(${members[i].memberID})"><img src="/assets/img/delete-button.png" width="30px" height="30px"></a>  
                <a href="editmember.html#${members[i].memberID}" onclick="getMemberByID(${members[i].memberID})"><img src="/assets/img/edit-button.png" width="30px" height="30px"></a>  
                <a href="borrowbook.html#${members[i].memberID}"><img src="/assets/img/borrow-book.png" width="30px" height="30px"></a>  
                <a href="returnbook.html#${members[i].memberID}"><img src="/assets/img/return-book.png" width="30px" height="30px"></a>  

            </div>
        </div> <!--card body ends here-->
    </div> <!-- Column/Card ends here -->`
    }
}
getAllMembers()

//                  GET ALL CATEGORIES

async function getAllCategories() {
    const categories = await fetch('/api/categories').then(r => r.json())

    document.querySelector('#categoryList').innerHTML = ''
    categories.forEach(data => {
        document.querySelector('#categoryList').innerHTML += ` <div class="card col-xl-5" style="margin-bottom: 20px; margin-right: 30px; margin-left: 20px;">
        <!-- card starts here-->
        <div class="card-header">

            Category ID: <span id="categoryID">${data.categoryID}</span>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-10">
                    <p id="categoryNameId" style="display: inline;">Category Name: </p><span
                        id="categoryName">${data.categoryName}</span>
                    <br>
                    <p id="categoryDesId" style="display: inline;">Category Description: </p><span
                        id="categoryDes">${data.categoryDes}  </span>
                    <br>
                </div>
                <div class="col-2 float-end " style="margin-top: 15px">
                    <div class="mb-2">
                        <button onClick="deleteCategory('${data.categoryID}')"
                            class="card-link btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                        <a href="editcategory.html#${data.categoryID}"
                            class="card-link btn btn-outline-info btn-sm " style="width: 58px;">Edit</a>
                   
                </div>

            </div>



        </div>
        <!--card body ends here-->
    </div> <!-- Column/Card ends here -->`
    })
}


getAllCategories()



//                          UPDATE CATEGORY
async function deleteCategory(id) {

    const fetchOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'delete'
    }
    const result = await fetch(`/api/deletecategory/${id}`, fetchOptions).then(r => r.json())
    // reload the quotes with the deleted ones now gone
    getAllCategories()
}

//                      EDIT CATEGORY
const categoryID = location.hash.substr(1)
const form = document.querySelector('#editForm')

form.setAttribute('action', `/api/category/${categoryID}/update`)

async function getcategoryByID() {


    const categoryList = await fetch(`/api/category/${categoryID}`).then(r => r.json())
    console.log(categoryList)

    document.querySelector('#categoryNameInput').value = categoryList[0].categoryName;
    document.querySelector('#categoryDesArea').value = categoryList[0].categoryDes;

}
getcategoryByID();
