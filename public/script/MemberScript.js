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

async function deleteMember(id) {

    const fetchOptions = {
        headers: { 'Content-Type': 'application/json' },
        method: 'delete'
    }
    const result = await fetch(`/api/member/${id}`, fetchOptions).then(r => r.json())
    // reload the quotes with the deleted ones now gone
    getAllMembers()
}



const memeberID=location.hash.substr(1)
const form = document.querySelector('#editForm')

form.setAttribute('action', `/api/member/${memeberID}/update`)

async function getMemberByID(){
    console.log(memeberID)
    const member = await fetch(`/api/member/${memeberID}` ).then( r=>r.json() )
    document.querySelector('#memberID').innerHTML = member[0].memeberID;
    document.querySelector('#firstNameInput').value = member[0].firstName;
    document.querySelector('#lastNameInput').value = member[0].lastName;
    document.querySelector('#phoneInput').value = member[0].phoneNumber;
    document.querySelector('#emailInput').value = member[0].email;
    document.querySelector('#addressTextArea').value = member[0].address;
}
getMemberByID();


     //function that takes memberID and return member info to search page
     async function getMemberByIDSearch(){

        document.querySelector("#member").innerHTML = "";


        const memeberID = document.querySelector("#memberIDInput").value;

        const member = await fetch(`/api/member/${memeberID}` ).then( r=>r.json() )

        document.querySelector("#member").innerHTML = `
        <div class="card col-xl-5" style="margin-bottom: 20px; margin-right: 30px; margin-left: 20px;"> <!-- card starts here-->
         <div class="card-header">
        Member ID: <span id="memberID">${member[0].memberID}</span>
        </div>
        <div class="card-body">
        <p style="display: inline;">First Name: </p><span id="firstName">${member[0].firstName}</span>
        <br>
        <p style="display: inline;">Last Name: </p><span id="lastName">${member[0].lastName}</span>
        <br>
        <p style="display: inline;">Phone Number: </p><span id="phoneNumber">${member[0].phoneNumber}</span>
        <br>
        <p style="display: inline;">Email: </p><span id="email">${member[0].email}</span>
        <br>
        <p style="display: inline;">Address: </p><span id="email">${member[0].address}</span>
        <br>
        <div class="float-end">
            <a href="#"><img src="/assets/img/delete-button.png" width="30px" height="30px"></a>
            <a href="editmember.html#${member[0].memberID}" onclick="getMemberByID(${member[0].memberID})"><img src="/assets/img/edit-button.png" width="30px" height="30px"></a>
            <a href="borrowbook.html#${member[0].memberID}"><img src="/assets/img/borrow-book.png" width="30px" height="30px"></a>
            <a href="returnbook.html#${member[0].memberID}"><img src="/assets/img/return-book.png" width="30px" height="30px"></a>

        </div>
        </div> <!--card body ends here-->
        </div> <!-- Column/Card ends here -->`
    }

    getMemberByIDSearch()