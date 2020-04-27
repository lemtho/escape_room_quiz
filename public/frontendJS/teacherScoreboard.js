// On load, hide the hidden divs.
document.getElementById("printResults").style.display = "none";
document.getElementById("noScores").style.display = "none";
document.getElementById("fromTeacherQuizID").style.display = "none";
document.getElementById("fromTeacherQuizName").style.display = "none";

document.getElementById("fromTeacherHomeID").style.display = "none";

// On load, IF hiddenQuizID is NULL...
if (document.getElementById("fromTeacherQuizID").textContent == "" && document.getElementById("fromTeacherHomeID").textContent == "")
{
    document.getElementById("quizDrop").style.display = "none";
    document.getElementById("studentDrop").style.display = "none";
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("displayScoresByStudent").style.display = "none";
}

// ELSE, hiddenQuiz has a value...
else
{
    if (document.getElementById("fromTeacherQuizID").textContent != "") {
        document.getElementById("studentDrop").style.display = "none";
        document.getElementById("displayScoresByStudent").style.display = "none";
        document.getElementById("quizRadio").checked = true;
        
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

    // populate student scoreboard with studentID from  student home page
    else {
        document.getElementById("quizDrop").style.display = "none";
        document.getElementById("displayScoresByQuiz").style.display = "none";
        document.getElementById("studentRadio").checked = true;
        
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
    var isShowing = 'false';

    for (i = 1; i < tr.length; i++) {
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding quizid)
        cell = tr[i].getElementsByTagName("td")[0];
        
        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
            isShowing = 'true';
        }
    }

    // if no records, display message
    if (isShowing != 'true') {
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
    var isShowing = 'false';

    for (i = 1; i < tr.length; i++) {
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding studentid)
        cell = tr[i].getElementsByTagName("td")[0];
        
        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
            isShowing = 'true';
        }
    }

    // if no records, display message
    if (isShowing != 'true') {
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