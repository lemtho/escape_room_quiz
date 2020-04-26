document.getElementById("quizDrop").style.display = "none";
document.getElementById("studentDrop").style.display = "none";
document.getElementById("displayScoresByQuiz").style.display = "none";
document.getElementById("displayScoresByStudent").style.display = "none";

function showQuizDrop() {
    document.getElementById('studentDrop').style.display ='none';
    document.getElementById('displayScoresByStudent').style.display ='none';

    document.getElementById("quizDrop").style.display = "block";
	appear.preventDefault();
}

function showStudentDrop() {
    document.getElementById('quizDrop').style.display ='none';
    document.getElementById('displayScoresByQuiz').style.display ='none';

    document.getElementById("studentDrop").style.display = "block";
	appear.preventDefault();
}

function searchQuiz() {
    document.getElementById("displayScoresByStudent").style.display = "none";
    document.getElementById("displayScoresByQuiz").style.display = "block";

    // get value of dropdown item (quizID)
    var e = document.getElementById("quizDropdown");
    var quizID = e.options[e.selectedIndex].value;

    // filter table by quizID
    var filter, table, tr, i;
    filter = quizID;
    table = document.getElementById("quizTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        // Hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column
        td = tr[i].getElementsByTagName("td");
        cell = tr[i].getElementsByTagName("td")[0];

        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
        }
    }
    
    appear.preventDefault();
}

function searchStudent() {
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("displayScoresByStudent").style.display = "block";

    // get value of dropdown item (quizID)
    var e = document.getElementById("studentDropdown");
    var studentID = e.options[e.selectedIndex].value;

    // filter table by studentID
    var filter, table, tr, i;
    filter = studentID;
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        // Hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column
        td = tr[i].getElementsByTagName("td");
        cell = tr[i].getElementsByTagName("td")[0];
        
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
        }
    }
    
    appear.preventDefault();
}

// code from https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
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
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
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
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }