// On load, hide the hidden divs.
document.getElementById("printResults").style.display = "none";
document.getElementById("noScores").style.display = "none";
document.getElementById("fromTeacherQuizID").style.display = "none";
document.getElementById("fromTeacherQuizName").style.display = "none";
document.getElementById("fromTeacherHomeID").style.display = "none";
document.getElementById("fromTeacherScoreboardPage").style.display = "none";
document.getElementById("radioNameFromServer").style.display = "none";
document.getElementById("quizButtonFromServer").style.display = "none";
document.getElementById("studentButtonFromServer").style.display = "none";
document.getElementById("sortStudentButtonFromServer").style.display = "none";
document.getElementById("sortQuizButtonFromServer").style.display = "none";

// On load, IF both hiddenQuizID and hiddenStudentQuizID are NULL and no radio button was selected...
if (document.getElementById("fromTeacherQuizID").textContent == "" & document.getElementById("fromTeacherHomeID").textContent == "" & document.getElementById("radioNameFromServer").textContent == "")
{
    document.getElementById("quizDrop").style.display = "none";
    document.getElementById("studentDrop").style.display = "none";
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("displayScoresByStudent").style.display = "none";
}

// ELSE, hiddenQuiz has a value...
else
{
    // IF user clicked the "Results" button on teacher quiz page...
    if (document.getElementById("fromTeacherQuizID").textContent != "") {
        document.getElementById("studentDrop").style.display = "none";
        document.getElementById("displayScoresByStudent").style.display = "none";
        document.getElementById("quizRadio").checked = true;
        document.getElementById("printResults").style.display = "block";
        
        /* Loop through the drop-down values. IF the value matches with fromTeacherQuizID, 
        select that option and break out of the WHILE-loop. */
        var optionIndex = 0; 
        while(true)
        {
            if (document.getElementById("quizDropdown").options[optionIndex].value == document.getElementById("fromTeacherQuizID").textContent)
            {
                document.getElementById("quizDropdown").options[optionIndex].selected = true;
                break;
            }
            // Implement optionIndex for the next iteration.
            optionIndex++;
        }

        // Display the results.
        // get value of dropdown item (quizID)
        var e = document.getElementById("quizDropdown");
        var filter = e.options[e.selectedIndex].value;

        // filter table by quizID
        var table, tr, i;
        table = document.getElementById("quizTable");
        tr = table.getElementsByTagName("tr");
        var isShowing = false;

        for (i = 1; i < tr.length; i++) {
            // Hide the row initially
            tr[i].style.display = "none";
        
            // element in 1st column
            cell = tr[i].getElementsByTagName("td")[0];

            if (cell.innerHTML == filter) {
                tr[i].style.display = "";
                isShowing = true;
            }
        }

        // if no records, display message
        if (!isShowing) 
        {
            document.getElementById("displayScoresByQuiz").style.display = "none";
            document.getElementById("printResults").style.display = "none";
            document.getElementById("noScores").style.display = "block";
        }

        // show table and print button
        else 
        {
            document.getElementById("displayScoresByQuiz").style.display = "block";
            document.getElementById("printResults").style.display = "block";
        }
    }

    // ELSE IF user clicked on "Scoreboard" button on teacher home page.
    else if (document.getElementById("fromTeacherHomeID").textContent != "")
    {
        document.getElementById("quizDrop").style.display = "none";
        document.getElementById("displayScoresByQuiz").style.display = "none";
        document.getElementById("studentRadio").checked = true;
        document.getElementById("printResults").style.display = "block";
        
        /* Loop through the drop-down values. IF the value matches with fromTeacherHomeID, 
        select that option and break out of the WHILE-loop. */
        var optionIndex = 0; 
        while(true)
        {
            if (document.getElementById("studentDropdown").options[optionIndex].value == document.getElementById("fromTeacherHomeID").textContent)
            {
                document.getElementById("studentDropdown").options[optionIndex].selected = true;
                break;
            }
            // Implement optionIndex for the next iteration.
            optionIndex++;
        }

        // Display the results.
        // get value of dropdown item (quizID)
        var e = document.getElementById("studentDropdown");
        var filter = e.options[e.selectedIndex].value;

        // filter table by quizID
        var table, tr, i;
        table = document.getElementById("studentTable");
        tr = table.getElementsByTagName("tr");

        for (i = 1; i < tr.length; i++) {
            // Hide the row initially
            tr[i].style.display = "none";
        
            // element in 1st column
            cell = tr[i].getElementsByTagName("td")[0];

            if (cell.innerHTML == filter) {
                tr[i].style.display = "";
            }
        }
    }

    // ELSE user already interacted with the buttons in the teacher scoreboard page...
    else
    {   
        // IF radio selection is "Quiz Name"... 
        if (document.getElementById("radioNameFromServer").textContent == "Quiz Name")
        {
            document.getElementById("quizRadio").checked = true;
            document.getElementById("quizDrop").style.display = "block";
            document.getElementById("studentDrop").style.display = "none";
            document.getElementById("displayScoresByQuiz").style.display = "none";
            document.getElementById("displayScoresByStudent").style.display = "none";
            
            // IF "Search" button was selected...
            if (document.getElementById("quizButtonFromServer").textContent > 0)
            {
                isShowing = false;
                
                document.getElementById("displayScoresByQuiz").style.display = "block";

                /* Loop through the drop-down values. IF the value matches with quizButtonFromServer, 
                select that option and break out of the WHILE-loop. */
                var optionIndex = 0; 
                while(true)
                {
                    if (document.getElementById("quizDropdown").options[optionIndex].value == document.getElementById("quizButtonFromServer").textContent)
                    {
                        document.getElementById("quizDropdown").options[optionIndex].selected = true;
                        break;
                    }
                    // Implement optionIndex for the next iteration.
                    optionIndex++;
                }

                // Display the results.
                // get value of dropdown item (quizID)
                var e = document.getElementById("quizDropdown");
                var filter = e.options[e.selectedIndex].value;

                // filter table by quizID
                var table, tr, i;
                table = document.getElementById("quizTable");
                tr = table.getElementsByTagName("tr");

                for (i = 1; i < tr.length; i++) 
                {
                    // Hide the row initially
                    tr[i].style.display = "none";
                
                    // element in 1st column
                    cell = tr[i].getElementsByTagName("td")[0];

                    if (cell.innerHTML == filter) {
                        tr[i].style.display = "";
                        isShowing = true;
                    }
                }

                // if no records, display message
                if (!isShowing) 
                {
                    document.getElementById("displayScoresByQuiz").style.display = "none";
                    document.getElementById("noScores").style.display = "block";
                }

                // show table and print button
                else 
                {
                    document.getElementById("displayScoresByQuiz").style.display = "block";
                    document.getElementById("printResults").style.display = "block";
                }
                
                // IF "Sort" button was selected...
                if (document.getElementById("sortStudentButtonFromServer").textContent != 0)
                {
                    document.getElementById("quizSort").value = document.getElementById("sortStudentButtonFromServer").textContent;
                    sortStudents();
                }
            }            
        }

        // ELSE, radio selection is "Student Name".
        else
        {
            document.getElementById("studentRadio").checked = true;
            document.getElementById("quizDrop").style.display = "none";
            document.getElementById("studentDrop").style.display = "block";
            document.getElementById("displayScoresByStudent").style.display = "none";
            document.getElementById("displayScoresByQuiz").style.display = "none";
            
            // IF "Search" button was selected...
            if (document.getElementById("studentButtonFromServer").textContent > 0)
            {
                document.getElementById("displayScoresByStudent").style.display = "block";

                /* Loop through the drop-down values. IF the value matches with studentButtonFromServer, 
                select that option and break out of the WHILE-loop. */
                var optionIndex = 0; 
                while(true)
                {
                    if (document.getElementById("studentDropdown").options[optionIndex].value == document.getElementById("studentButtonFromServer").textContent)
                    {
                        document.getElementById("studentDropdown").options[optionIndex].selected = true;
                        break;
                    }
                    // Implement optionIndex for the next iteration.
                    optionIndex++;
                }

                // Display the results.
                // get value of dropdown item (studentID)
                var e = document.getElementById("studentDropdown");
                var filter = e.options[e.selectedIndex].value;

                // filter table by studentID
                var table, tr, i;
                table = document.getElementById("studentTable");
                tr = table.getElementsByTagName("tr");

                for (i = 1; i < tr.length; i++) 
                {
                    // Hide the row initially
                    tr[i].style.display = "none";
                
                    // element in 1st column
                    cell = tr[i].getElementsByTagName("td")[0];

                    if (cell.innerHTML == filter) {
                        tr[i].style.display = "";
                    }
                }

                document.getElementById("printResults").style.display = "block";
                
                // IF "Sort" button was selected...
                if (document.getElementById("sortQuizButtonFromServer").textContent != 0)
                {
                    document.getElementById("studentSort").value = document.getElementById("sortQuizButtonFromServer").textContent;
                    sortQuizzes();
                }
            }
        }
    }
}

// When the user clicks on "Quiz Name" radio selection only...
document.getElementById("quizRadio").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("quizRadio").value;
    var quizButton = 0;
    var studentButton = 0;
    var sortStudentButton = 0;
    var sortQuizButton = 0;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// When the user clicks on the "Search" button under "Quiz Name" radio selection...
document.getElementById("searchQuizButton").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("quizRadio").value;
    // Get value of quiz name user selected.
    var quizButton = document.getElementById("quizDropdown").value;
    var studentButton = 0;
    var sortStudentButton = 0;
    var sortQuizButton = 0;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// When the user clicks on the "Sort" button under "Quiz Name" radio selection...
document.getElementById("sortStudentButton").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("quizRadio").value;
    // Get value of quiz name user selected.
    var quizButton = document.getElementById("quizDropdown").value;
    var studentButton = 0;
    // Get value of sort by that user selected.
    var sortStudentButton = document.getElementById("quizSort").value;
    var sortQuizButton = 0;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// When the user clicks on "Student Name" radio selection...
document.getElementById("studentRadio").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("studentRadio").value;
    var quizButton = 0;
    var studentButton = 0;
    var sortStudentButton = 0;
    var sortQuizButton = 0;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// When the user clicks on the "Search" button under "Student Name" radio selection...
document.getElementById("searchStudentButton").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("studentRadio").value;
    var quizButton = 0;
    // Get value of student name user selected.
    var studentButton = document.getElementById("studentDropdown").value;
    var sortStudentButton = 0;
    var sortQuizButton = 0;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// When the user clicks on the "Sort" button under "Student Name" radio selection...
document.getElementById("sortQuizButton").addEventListener("click", function(addToSessionData)
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the createAccount() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store search fields in.
    var fromTeacherScoreboardPage = true;
    var radioName = document.getElementById("studentRadio").value;
    var quizButton = 0;
    // Get value of student name user selected.
    var studentButton = document.getElementById("studentDropdown").value;
    var sortStudentButton = 0;
    // Get value of sort by that user selected.
    var sortQuizButton = document.getElementById("studentSort").value;
    
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
        do nothing. */
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
    var data = JSON.stringify({"fromTeacherScoreboardPage": fromTeacherScoreboardPage, "radioName": radioName, "quizButton": quizButton, "studentButton": studentButton, "sortStudentButton": sortStudentButton, "sortQuizButton": sortQuizButton});

    // Send data with the request.
    req.send(data);
});

// Helper function definitions below.
function showQuizDrop() {
    document.getElementById('studentDrop').style.display ='none';
    document.getElementById('displayScoresByStudent').style.display ='none';
    document.getElementById('printResults').style.display ='none';
    document.getElementById('noScores').style.display ='none';

    document.getElementById("quizDrop").style.display = "block";
}

function showStudentDrop() {
    document.getElementById('quizDrop').style.display ='none';
    document.getElementById('displayScoresByQuiz').style.display ='none';
    document.getElementById('printResults').style.display ='none';
    document.getElementById('noScores').style.display ='none';

    document.getElementById("studentDrop").style.display = "block";
}

function searchQuiz() {
    // on button click, refresh elements
    document.getElementById("displayScoresByStudent").style.display = "none";
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("noScores").style.display = "none";
    document.getElementById("printResults").style.display = "none";

    // get value of dropdown item (quizID)
    var e = document.getElementById("quizDropdown");
    var filter = e.options[e.selectedIndex].value;

    // filter table by quizID
    var table, tr, i;
    table = document.getElementById("quizTable");
    tr = table.getElementsByTagName("tr");
    var isShowing = false;

    for (i = 1; i < tr.length; i++) {
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding quizid)
        cell = tr[i].getElementsByTagName("td")[0];
        
        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
            isShowing = true;
        }
    }

    // if no records, display message
    if (!isShowing) {
        document.getElementById("noScores").style.display = "block";
    }

    // show table and print button
    else {
        document.getElementById("displayScoresByQuiz").style.display = "block";
        document.getElementById("printResults").style.display = "block";
    }
}

function searchStudent() {
    // on button click, refresh elements
    document.getElementById("displayScoresByStudent").style.display = "none";
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("noScores").style.display = "none";
    document.getElementById("printResults").style.display = "none";

    // get value of dropdown item (studentID)
    var e = document.getElementById("studentDropdown");
    var filter = e.options[e.selectedIndex].value;

    // filter table by studentID
    var table, tr, i;
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");
    var isShowing = false;

    for (i = 1; i < tr.length; i++) {
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding studentid)
        cell = tr[i].getElementsByTagName("td")[0];
        
        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
            isShowing = true;
        }
    }

    // if no records, display message
    if (!isShowing) {
        document.getElementById("noScores").style.display = "block";
    }

    // show table and print button
    else {
        document.getElementById("displayScoresByStudent").style.display = "block";
        document.getElementById("printResults").style.display = "block";
    }
}

// to delete student from quiz
function deleteStudentScore(qid, sid){
    $.ajax({
        url: '/teacherScoreboard/' + qid + '/' + sid,
        type: 'DELETE',
        success: function(result){
          window.location.reload();
        }
    })
};

// code sourced from https://www.w3schools.com/howto/howto_js_sort_table.asp
// sort table by column both asc/desc
function sortStudents() {
    // check value of drop down
    var e = document.getElementById("quizSort");
    var sortValue = e.options[e.selectedIndex].value;

    if (sortValue == 'sortFirst') {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("quizTable");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
            } 
            else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    
    // filter by last name
    else if (sortValue == 'sortLast') {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("quizTable");
        switching = true;
        
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[2];
                y = rows[i + 1].getElementsByTagName("td")[2];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } 
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    // filter by score ("value == 'sortScore'")
    else {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("quizTable");
        switching = true;

        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("td")[3];
                y = rows[i + 1].getElementsByTagName("td")[3];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount ++;
            } 
            else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
}

function sortQuizzes() {
    // check value of drop down
    var e = document.getElementById("studentSort");
    var sortValue = e.options[e.selectedIndex].value;

    if (sortValue == 'sortQuiz') {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("studentTable");
        switching = true;

        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } 
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    // filter by score ("value == 'sortScore'")
    else {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("studentTable");
        switching = true;
        dir = "asc";

        while (switching) {
            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[2];
                y = rows[i + 1].getElementsByTagName("td")[2];

                if (dir == "asc") {
                    if (x.innerHTML > y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                } 
                else if (dir == "desc") {
                    if (x.innerHTML < y.innerHTML) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount ++;
            } 
            else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
}