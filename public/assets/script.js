
// fetch url from server and get respond
function addMember(info) {
  return await fetch('/add/member', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
}

// get all the new member info from form and call server
function addMember() {
  // memberInfo is a object {memberID, firstName, lastName, phoneNum, email, address}
  let memberInfo = {}
  memberInfo['memberID'] = 1
  memberInfo['firstName'] = ''
  memberInfo['lastName'] = ''
  memberInfo['phoneNumber'] = ''
  memberInfo['email'] = ''
  memberInfo['address'] = ''
  addMember(memberInfo).then(
    // a rander function should be here
  )
}