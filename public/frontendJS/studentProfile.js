// onload hide update table/button and password rule span
document.getElementById("updateNameForm").style.display = "none";
document.getElementById("changePasswordForm").style.display = "none";
document.getElementById("passwordRule").style.display = "none";

// edit name button is clicked
document.getElementById("editNameButton").addEventListener("click", function(appear)
{	
    // Hide table
    document.getElementById("nameTable").style.display = "none";

    // Display update form
    document.getElementById("updateNameForm").style.display = "block";

	appear.preventDefault();
});

function updateName(){
    $.ajax({
        url: '/studentProfile/',
        type: 'PUT',
        data: $('#updateName').serialize(),
        success: function(result){
            window.location.reload();
        }
    })
};

// change password button is clicked
document.getElementById("changePasswordButton").addEventListener("click", function(appear)
{	
    // Hide button
    document.getElementById("changePasswordButton").style.display = "none";

    // Display update form
    document.getElementById("changePasswordForm").style.display = "block";
    appear.preventDefault();
});

function updatePassword(){
    if (document.getElementById('newPassword').value != document.getElementById('confirmPassword').value) {
        alert('Password does not match! Please reenter.');
    }
    else if (document.getElementById('newPassword').value.length > 12 | document.getElementById('newPassword').value.search(" ") != -1) {
        alert("The password you entered is invalid. Please enter a different password up to 12 characters and with no spaces.");
    }
    else {
        $.ajax({
            url: '/studentProfile/',
            type: 'PUT',
            data: $('#updatePassword').serialize(),
            success: function(result){
                window.location.reload();
            }
        })
    }
};

/* Function definition that displays the span element that consists of the password restrictions 
when user updates password. */
function displayPasswordRule()
{
    document.getElementById("passwordRule").style.display = "block";
};