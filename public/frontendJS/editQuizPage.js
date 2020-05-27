function addQuestion(id){
    $.ajax({
        url: '/teacherQuiz/Quiz/' + id,
        type: 'POST',
        data: $('#new_question').serialize(),
        success: function(result){
            window.location.reload();
        }
    });
};

// When the user wants to update quiz name...
document.getElementById("updateQuizNameButton").addEventListener("click", function(updateQuizName)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the updateQuizName() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store quiz ID and quiz name in.
    var quizID;
    var quizName;

    // Get the quiz ID and quiz name.
    quizID = document.getElementById("quizID").textContent;
    quizName = document.getElementById("quizNameID").value;

    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/teacherQuiz/Quiz/" + quizID;

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
    var data = JSON.stringify({"quizID": quizID, "quizName": quizName});

    // Send data with the request.
    req.send(data);

    updateQuizName.preventDefault();
});

//Hide add question form on load
document.getElementById("add_Question").style.display ="none";
document.getElementById("SAQuestion").style.display ="none";
document.getElementById("TFQuestion").style.display ="none";
document.getElementById("MCQuestion").style.display ="none";

document.getElementById("newQuestion").addEventListener("click", function(appear){
    document.getElementById("add_Question").style.display = "block";
    document.getElementById("noQuestion").style.display = "none";
    document.getElementById("SAQuestion").style.display ="none";
    document.getElementById("TFQuestion").style.display ="none";
    document.getElementById("MCQuestion").style.display ="none";
    appear.preventDefault(); 
});

//Function to display different answer prompt for different question type
//Referenced: https://www.youtube.com/watch?v=zndWZv9DZWc
function showQuestion(x){ 
    if(x==0){
        document.getElementById("SAQuestion").style.display ="block";
        document.getElementById("TFQuestion").style.display ="none";
        document.getElementById("MCQuestion").style.display ="none";
    }
    else if(x==1){
        document.getElementById("TFQuestion").style.display ="block";
        document.getElementById("SAQuestion").style.display ="none";
        document.getElementById("MCQuestion").style.display ="none";
    }
    else{
        document.getElementById("MCQuestion").style.display ="block";
        document.getElementById("SAQuestion").style.display ="none";
        document.getElementById("TFQuestion").style.display ="none";
    }

}

//Function to auto-select TF wrong answer based on select TF answer
function selectWrongAnswer(x){
    if(x==0){
        var wrongChoice = document.getElementById("FChoice");
        wrongChoice.checked = true; 
    }
    else{
        var wrongChoice = document.getElementById("TChoice");
        wrongChoice.checked = true; 
    }
}

//Function to auto-select TF answer based on select TF wrong answer
function selectAnswer(x){
    if(x==0){
        var wrongChoice = document.getElementById("FAnswer");
        wrongChoice.checked = true; 
    }
    else{
        var wrongChoice = document.getElementById("TAnswer");
        wrongChoice.checked = true; 
    }
}

function updateQuestion(id){
    var form =$('#' + 'edit_question' + id);
    $.ajax({
        url: '/teacherQuiz/Quiz/' + id,
        type: 'PUT',
        data: $(form).serialize(),
        success: function(result){
            window.location.reload();
        }
    });
};

function deleteQuestion(id){
    $.ajax({
        url: '/teacherQuiz/Quiz/' + id,
        type: "DELETE", 
        success: function(result){
            window.location.reload(); 
        }
    });
};