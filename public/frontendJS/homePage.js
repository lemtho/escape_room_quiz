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