document.getElementById("rule").style.display = "none";

function displayRule()
{
    document.getElementById("rule").style.display = "block";
};

// IF the "Go" button is clicked...
document.getElementById("goButton").addEventListener("click", function(go)
{	
    
    // IF user did not input a quiz code...
    if (document.getElementById("quizID").value == "")
    {
        // Alert the user to input a quiz code.
        alert("Invalid input! Please enter a quiz code.");
    }

    // ELSE, user inputted a quiz code. Proceed to send the request to the server.
    else
    {
        /* Declare a local variable to store quiz code and store quiz code inputted
        by user in the variable. */
        var quizCode = document.getElementById("quizID").value;
        
        // Create a XMLHttpRequest object.
        var req = new XMLHttpRequest();

        // Define the URL to send data to.
        var url = "/studentHomePage/playGame";

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
            redirect user to the responseURL site. (i.e., student game page). */
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
        
        // Convert JSON data to string.
        var data = JSON.stringify({"quizID": quizCode});

        // Send data with the request.
        req.send(data);
    }

	go.preventDefault();
});