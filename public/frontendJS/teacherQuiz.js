//ajax function to delete quiz and reload page
function deleteQuiz(id){
    $.ajax({
        url: '/teacherQuiz/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

// publish the quiz to generate a quiz code if quiz has at minimum 10 questions
function publishQuiz(numQuestion, id)
{
    if (numQuestion >= 10)
    {
        $.ajax({
            url: '/teacherQuiz/' + id,
            type: 'PATCH',
            // data: JSON.stringify({published: "Y"}),
            success: function(result){
                window.location.reload();
            }
        })
        // console.log("success!");
    }
    else
    {
        alert("Quiz must have a minimum of 10 questions in order to be published.");
    }
}

// When the user clicks on the Results button...
function fetchResults(quizID, quizName)
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
    var data = JSON.stringify({"fromTeacherQuizID": quizID, "fromTeacherQuizName": quizName});

    // Send data with the request.
    req.send(data);
}