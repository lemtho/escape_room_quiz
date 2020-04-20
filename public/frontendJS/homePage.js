// On load, hide loginHeader, createAccountHeader, loginSection, and createAccountSection.
document.getElementById("loginHeader").style.display = "none";
document.getElementById("createAccountHeader").style.display = "none";
document.getElementById("loginSection").style.display = "none";
document.getElementById("createAccountSection").style.display = "none";

// IF "Log In" button is clicked...
document.getElementById("signInButton").addEventListener("click", function(appear)
{	
    // Hide selectOptionHeader and option buttons.
    document.getElementById("selectOptionHeader").style.display = "none";
	document.getElementById("optionLoginButton").style.display = "none";
	document.getElementById("optionSignUpButton").style.display = "none";
    // Display loginHeader and login form.
    document.getElementById("loginHeader").style.display = "block";
	document.getElementById("loginSection").style.display = "block";
	appear.preventDefault();
});

// IF "Create An Account" button is clicked...
document.getElementById("signUpButton").addEventListener("click", function(appear)
{	
    // Hide selectOptionHeader and option buttons.
    document.getElementById("selectOptionHeader").style.display = "none";
	document.getElementById("optionLoginButton").style.display = "none";
	document.getElementById("optionSignUpButton").style.display = "none";
    // Display createAccountHeader and create account form.
    document.getElementById("createAccountHeader").style.display = "block";
	document.getElementById("createAccountSection").style.display = "block";
	appear.preventDefault();
});

// When the user logs in...
document.getElementById("loginButton").addEventListener("click", function(logIn)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the logIn() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store email, password, and userType in
    var email;
    var password;
    var accountType;
    
    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/login";

    // Open a connection.
    req.open("POST", url, true);

    // Set the request header.
    req.setRequestHeader('Content-Type', 'application/json');

    // Create a state change callback.
    req.onreadystatechange = function()
    {
        // TEST: Output response from server.
        // console.log(req);
        
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = req.responseURL;
        }

        else if (req.readyState == 4 & req.status == 400)
        {
            alert(req.responseText);
        }
    }

    // Get email and password from user input.
    email = document.getElementById("loginEmail").value;
    password = document.getElementById("loginPassword").value;
    
    // Get userType from user selection.
    if (document.getElementById("SLogin").checked)
    {
        accountType = "S";
    }
    
    else
    {
        accountType = "T";
    }
    
    // Convert JSON data to string.
    var data = JSON.stringify({"email": email, "password": password, "userType": accountType});

    // Send data with the request.
    req.send(data);

    logIn.preventDefault();
});