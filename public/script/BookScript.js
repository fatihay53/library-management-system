// function checkSelectedOption(){
//    let xyz = document.querySelector("#categoryOptions").value
//    if(xyz ==="")
//    {
//        alert('Please select category')
//    }
// }

// function to return list of categories to display in dropdown menu to add new book
async function getCategoryList() {

    const catgeoriesList = await fetch('/api/categoriesList').then(r => r.json())

    // document.querySelector('#membersList').innerHTML = ''


    for (i = 0; i < catgeoriesList.length; i++) {
        document.querySelector('#categoryOptions').innerHTML +=
            `<option value="${catgeoriesList[i].categoryID}">${catgeoriesList[i].categoryName}</option>`;
    }
}
getCategoryList()


function fetchJSON( url, method='get', data={} ){
    const fetchOptions = {
        method,
        headers: { 'Content-Type': 'application/json' }	
    }
    if( method==='post' || method==='put' )
        fetchOptions.body = JSON.stringify(data)


    return fetch(url, fetchOptions).then( r=>r.json() )

}

async function getAllAvailableBooks() {
    const availableBooks = await fetch('/api/availablebooks').then(r => r.json())


    // document.querySelector('#availableList').innerHTML = ''
    for (i = 0; i < availableBooks.length; i++) {
        document.querySelector('#availableList').innerHTML += 
        `<li class="list-group-item"><span id="bookID" hidden>${availableBooks[i].bookID}</span><b>Book Name:</b> ${availableBooks[i].bookName}  
            <b>Author:</b> ${availableBooks[i].author} <b>Category:</b> ${availableBooks[i].categoryName} <b>Publishing Year:</b> ${availableBooks[i].publishingYear}  
            <a class="btn btn-outline float-end" onClick={updateBook(${availableBooks[i].bookID})} style="color: #26A3B4; border: 1px solid #26A3B4;">Select</a></li>`
    }
}


async function updateBook(BookID){
    const memeberID = getMemberByIDToBorrow();
    const bookID = JSON.stringify(BookID)
    const borrowDate = JSON.stringify(moment().format("YYYY/MM/DD"));
    console.log(borrowDate)

    // const bookID = document.querySelector("#bookID").innerHTML;
    console.log(`memberID is ${memeberID}`)
    console.log(`Book id is ${bookID}`)
    console.log(`Book id is ${borrowDate}`)

    const bookData = {bookID: bookID, memberID:memeberID, borrowDate:borrowDate}
    const result = await fetchJSON(`/api/borrow`,'put', bookData)
    if(result.status == true){
        window.location.replace("/index.html")
    }
    
}

function getMemberByIDToBorrow(){
    let memeberID=location.hash.substr(1)
    return memeberID;

}

let availableBooks = document.querySelector('#availableList')
async function searchBook() {
    const book = document.querySelector('#searchBar').value
    const bookList = await fetch(`/api/book/search/${book}`).then((r) => r.json())
    
    availableBooks.innerHTML = ''
    for (i = 0; i < bookList.length; i++) {
        availableBooks.innerHTML += 
        `<li class="list-group-item"><span id="bookID" hidden>${bookList[i].bookID}</span><b>Book Name:</b> ${bookList[i].bookName}  
            <b>Author:</b> ${bookList[i].author} <b>Category:</b> ${bookList[i].categoryName} <b>Publishing Year:</b> ${bookList[i].publishingYear}  
            <a class="btn btn-secondary float-end" onClick={updateBook(${bookList[i].bookID})} style="background-color: #26A3B4">Select</a></li>`
    }
}

function enterSearch(event) {
    // event.preventDefault()
    if (event.key === 'Enter') {
        searchBook()
    }
}

getMemberByIDToBorrow();
getAllAvailableBooks() 



function fetchJSON( url, method='get', data={} ){
    const fetchOptions = {
        method,
        headers: { 'Content-Type': 'application/json' },					
    }
    if( method==='post' || method==='put' )
        fetchOptions.body = JSON.stringify(data)

    return fetch(url, fetchOptions).then( r=>r.json() )
}

async function getAllBorrowedBooksByID(){
    const memberID = getMemberByIDToReturn();
    const borrowedBooks = await fetch(`/api/getborrowedbooks/${memberID}`).then(r => r.json())

    for(i=0; i<borrowedBooks.length; i++){
        document.querySelector("#borrowedListByMember").innerHTML += `
        <li class="list-group-item"><span id="bookID" hidden>${borrowedBooks[i].bookID}</span><b>Book Name:</b> ${borrowedBooks[i].bookName}    
            <b>Author:</b> ${borrowedBooks[i].author}     <b>Borrowed On:</b> ${borrowedBooks[i].borrowDate}  
            <a class="btn btn-outline-light float-end"onClick={returnBook(${borrowedBooks[i].bookID})} style="color: #26A3B4; border: 1px solid #26A3B4;">Return</a></li>`
    }
}

async function returnBook(BookID){

    const bookID = JSON.stringify(BookID)

    const book = {bookID: bookID}

    const result = await fetchJSON(`/api/return`,'put', book)

    if(result.status == true){
        window.location.replace("/index.html")
    }

}

function getMemberByIDToReturn(){
    let memberID=location.hash.substr(1)
    return memberID;
}

getAllBorrowedBooksByID()