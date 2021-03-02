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
        headers: {'Content-Type': 'application/json' }, 
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


// ============== Call the server and get all members =========================== 
async function getAllMembers(){
    const members = await fetch('/api/members' ).then( r=>r.json() )

    document.querySelector('#membersList').innerHTML = ''
    for(i=0; i<members.length; i++){
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
                <a href="#" class="btn btn-secondary">Borrow book</a>
            </div>
        </div> <!--card body ends here-->
    </div> <!-- Column/Card ends here -->`
    }
}
getAllMembers()

