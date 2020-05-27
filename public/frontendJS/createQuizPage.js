// When the user wants to update quiz name...
document.getElementById("nextButton").addEventListener("click", function(checkQuizName)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the updateQuizName() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store quiz name in.
    var quizName;

    // Get the quiz ID and quiz name.
    quizName = document.getElementById("quizNameID").value;

    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/teacherQuiz/Quiz";

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
        redirect user to the responseURL site. (i.e., teacher edit quiz page). */
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
    var data = JSON.stringify({"quizName": quizName});

    // Send data with the request.
    req.send(data);

    checkQuizName.preventDefault();
});