// When the user clicks on the Results button...
function fetchResults(studentID)
{
    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/teacherScoreboard";

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
        redirect user to the teacherScoreboard page. */
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = "/teacherScoreboard";
        }
    };

    // Convert JSON data to string.
    var data = JSON.stringify({"fromTeacherHomeID": studentID});

    // Send data with the request.
    req.send(data);
}