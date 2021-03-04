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
                        <a onClick="deleteCategory('${data.categoryID}')"
                            class="card-link btn btn-outline-danger btn-sm" style="width: 61px;">Delete</a>
                        </div>
                        <a href="editcategory.html#${data.categoryID}"
                            class="card-link btn btn-outline-info btn-sm " style="width: 61px; color: #26A3B4; border: 1px solid #26A3B4;">Edit</a>
                   
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