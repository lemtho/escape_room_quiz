// onload hide update table/button
document.getElementById("updateNameForm").style.display = "none";
document.getElementById("changePasswordForm").style.display = "none";


// edit name button is clicked
document.getElementById("editNameButton").addEventListener("click", function(appear)
{	
    // Hide table
    document.getElementById("nameTable").style.display = "none";

    // Display update form
    document.getElementById("updateNameForm").style.display = "block";

    // set attributes
    document.getElementById('editId').setAttribute('value', document.getElementById('id').value);
    document.getElementById('editFirstName').setAttribute('value', document.getElementById('firstName').value);
    document.getElementById('editLastName').setAttribute('value', document.getElementById('lastName').value);
    document.getElementById('editEmail').setAttribute('value', document.getElementById('email').value);
    document.getElementById('editPassword').setAttribute('value', document.getElementById('password').value);
    document.getElementById('editUserType').setAttribute('value', document.getElementById('userType').value);

	appear.preventDefault();
});

function editName(firstName, lastName){
	var req = new XMLHttpRequest();

	var studentData = {studentID:null, firstName:null, lastName:null, email:null, password:null, userType:null};
    studentData.studentID = document.getElementById('id').value;
    studentData.email = document.getElementById('email').value;
    studentData.password = document.getElementById('password').value;
    studentData.userType = document.getElementById('userType').value;
	  studentData.firstName = firstName;
	  studentData.lastName = lastName;

	req.open("POST", "/studentProfile/editName", true);
	req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function(){
        if(req.status >= 200 && req.status < 400){
            var response = req.responseText;
			location.reload();
        }
    }
    req.send(JSON.stringify(studentData));
    event.preventDefault();
}

// change password button is clicked
document.getElementById("changePasswordButton").addEventListener("click", function(appear)
{	
    // Hide button
    document.getElementById("changePasswordButton").style.display = "none";

    // Display update form
    document.getElementById("changePasswordForm").style.display = "block";
    
    // set attributes
    document.getElementById('editId').setAttribute('value', document.getElementById('id').value);
    document.getElementById('editFirstName').setAttribute('value', document.getElementById('firstName').value);
    document.getElementById('editLastName').setAttribute('value', document.getElementById('lastName').value);
    document.getElementById('editEmail').setAttribute('value', document.getElementById('email').value);
    document.getElementById('editPassword').setAttribute('value', document.getElementById('password').value);
    document.getElementById('editUserType').setAttribute('value', document.getElementById('userType').value);

    appear.preventDefault();
});

function editPassword(password){
	var req = new XMLHttpRequest();

	var studentData = {studentID:null, firstName:null, lastName:null, email:null, password:null, userType:null};
    studentData.studentID = document.getElementById('id').value;
    studentData.email = document.getElementById('email').value;
    studentData.password = password;
    studentData.userType = document.getElementById('userType').value;
	  studentData.firstName = document.getElementById('firstName').value;
	  studentData.lastName = document.getElementById('lastName').value;

	req.open("POST", "/studentProfile/edit", true);
	req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function(){
        if(req.status >= 200 && req.status < 400){
            var response = req.responseText;
			location.reload();
        }
    }
    req.send(JSON.stringify(studentData));
    event.preventDefault();
}
