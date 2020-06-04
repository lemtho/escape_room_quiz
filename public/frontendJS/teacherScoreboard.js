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
// printValues();

// On load, IF both hiddenQuizID and hiddenStudentQuizID are NULL and no radio button was selected...
if (document.getElementById("fromTeacherQuizID").textContent == "" & document.getElementById("fromTeacherHomeID").textContent == "" & localStorage._quizDropdown == undefined & localStorage._studentDropdown == undefined)
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
        // reset the local storage
        localStorage.clear();

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

        // Set the local storage values
        document.getElementById("fromTeacherQuizID").textContent = "";
        saveValues();
    }

    // ELSE IF user clicked on "Scoreboard" button on teacher home page.
    else if (document.getElementById("fromTeacherHomeID").textContent != "")
    {
        // reset local storage
        localStorage.clear();

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

        // Set the local storage values
        document.getElementById("fromTeacherHomeID").textContent = "";
        saveValues();
    }

    // ELSE user already interacted with the buttons in the teacher scoreboard page by searching by quiz name
    else if (localStorage._quizDropdown != "")
    {   
        document.getElementById("studentDrop").style.display = "none";
        document.getElementById("displayScoresByStudent").style.display = "none";
        document.getElementById("quizRadio").checked = true;
        document.getElementById("printResults").style.display = "block";

        /* Loop through the drop-down values. IF the value matches with fromTeacherQuizID, 
        select that option and break out of the WHILE-loop. */
        var optionIndex = 0; 
        while(true)
        {
            if (document.getElementById("quizDropdown").options[optionIndex].value == localStorage._quizDropdown)
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

        // IF "Sort" button was selected...
        if (localStorage._quizSort != undefined)
        {
            document.getElementById("quizSort").value = localStorage._quizSort;
            sortStudents();
        }
        else
        {
            document.getElementById("quizSort").value = 'sortFirst';
        }
    }

    // User has searched by student name
    else if (localStorage._studentDropdown != "")
    {
        document.getElementById("quizDrop").style.display = "none";
        document.getElementById("displayScoresByQuiz").style.display = "none";
        document.getElementById("studentRadio").checked = true;
        document.getElementById("printResults").style.display = "block";

        /* Loop through the drop-down values. IF the value matches with fromTeacherQuizID, 
        select that option and break out of the WHILE-loop. */
        var optionIndex = 0; 
        while(true)
        {
            if (document.getElementById("studentDropdown").options[optionIndex].value == localStorage._studentDropdown)
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
            document.getElementById("displayScoresByStudent").style.display = "none";
            document.getElementById("printResults").style.display = "none";
            document.getElementById("noScores").style.display = "block";
        }

        // show table and print button
        else 
        {
            document.getElementById("displayScoresByStudent").style.display = "block";
            document.getElementById("printResults").style.display = "block";
        }

        // IF "Sort" button was selected...
        if (localStorage._studentSort != undefined)
        {
            document.getElementById("studentSort").value = localStorage._studentSort;
            sortQuizzes();
        }
        else
        {
            document.getElementById("studentSort").value = 'sortQuiz';
        }
    }
}

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

    // Store values in localStorage, set default sortQuiz value to sortFirst
    localStorage._quizSort = "sortFirst";
    localStorage._studentSort = "";
    saveValues();
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

    // Store values in localStorage, set default studentSort value to Quiz
    localStorage._studentSort = "sortQuiz";
    localStorage._quizSort = "";
    saveValues();
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

    localStorage._quizSort = sortValue;
    localStorage._studentSort = "";
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

    localStorage._quizSort = "";
    localStorage._studentSort = sortValue;
}

// Store document attributes in local storage
function saveValues()
{
    if (document.getElementById("quizRadio").checked)
    {
        localStorage._quizDropdown = document.getElementById("quizDropdown").value;
        localStorage._studentDropdown = "";
    }
    else if (document.getElementById("studentRadio").checked)
    {
        localStorage._studentDropdown = document.getElementById("studentDropdown").value;
        localStorage._quizDropdown = "";
    }
    else
    {
        localStorage._studentDropdown = "";
        localStorage._quizDropdown = "";
    }
}

function printValues()
{
    console.log("QUIZ DROP = " + localStorage._quizDropdown);    
    console.log("QUIZ SORT = " + localStorage._quizSort);
    console.log("STUDENT DROP = " + localStorage._studentDropdown);
    console.log("STUDENT SORT = " + localStorage._studentSort);
}

function clearStorage()
{
    localStorage.clear();
    window.location.href = "/logout";
}