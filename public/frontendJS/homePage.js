// On load, hide loginHeader, createAccountHeader, loginSection, createAccountSection, and passwordRule.
document.getElementById("loginHeader").style.display = "none";
document.getElementById("createAccountHeader").style.display = "none";
document.getElementById("loginSection").style.display = "none";
document.getElementById("createAccountSection").style.display = "none";
document.getElementById("passwordRule").style.display = "none";

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
    
    // Create a local variable to store email, password, and userType in.
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
        
        /* IF response from server is good and the response has completed, 
        redirect user to the responseURL site. (i.e., student or teacher home page). */
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = req.responseURL;
        }

        /* IF response from server is bad request, alert user with the message
        (i.e., responseText) server sent. */
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

// When the user creates an account...
document.getElementById("createAccountButton").addEventListener("click", function(createAccount)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store first name, last name, email, password, and userType in.
    var firstName;
    var lastName;
    var email;
    var password;
    var accountType;
    
    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/create";

    // Open a connection.
    req.open("POST", url, true);

    // Set the request header.
    req.setRequestHeader('Content-Type', 'application/json');

    // Create a state change callback.
    req.onreadystatechange = function()
    {
        // TEST: Output response from server.
        // console.log(req);
        
        /* IF response from server is good and the response has completed, 
        redirect user to the responseURL site. (i.e., student or teacher home page). */
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = req.responseURL;
        }

        /* IF response from server is bad request, alert user with the message
        (i.e., responseText) server sent. */
        else if (req.readyState == 4 & req.status == 400)
        {
            alert(req.responseText);
        }
    }

    // Get first name, last name, email, and password from user input.
    firstName = document.getElementById("accountFirstName").value;
    lastName = document.getElementById("accountLastName").value;
    email = document.getElementById("accountEmail").value;
    password = document.getElementById("accountPassword").value;
    
    // Check that email is properly formatted
    var validEmail = validateEmail(email);
    if (validEmail)
    {
        // Get userType from user selection.
        if (document.getElementById("ALogin").checked)
        {
            accountType = "S";
        }
        
        else
        {
            accountType = "T";
        }
        
        // Convert JSON data to string.
        var data = JSON.stringify({"firstName": firstName, "lastName": lastName, "email": email, "password": password, "userType": accountType});

        // Send data with the request.
        req.send(data);

        createAccount.preventDefault();
    }
    else
    {
        alert("You have entered an invalid email address!");
    }
});

/* Function definition that displays the span element that consists of the password restrictions 
when user creates password. */
function displayPasswordRule()
{
    document.getElementById("passwordRule").style.display = "block";
};

// code source from: https://www.w3resource.com/javascript/form/email-validation.php
// checks that email is in proper format.
function validateEmail(email) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true);
    }
    return (false);
}