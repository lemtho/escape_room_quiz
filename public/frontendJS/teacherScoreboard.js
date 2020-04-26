// On load, hide the hidden divs.
document.getElementById("fromTeacherQuizID").style.display = "none";
document.getElementById("fromTeacherQuizName").style.display = "none";

// On load, IF hiddenQuizID is NULL...
if (document.getElementById("fromTeacherQuizID").textContent == "")
{
  document.getElementById("quizDrop").style.display = "none";
  document.getElementById("studentDrop").style.display = "none";
  document.getElementById("displayScoresByQuiz").style.display = "none";
  document.getElementById("displayScoresByStudent").style.display = "none";
}

// ELSE, hiddenQuiz has a value...
else
{
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
}

// Helper function definitions below.
function showQuizDrop() {
    document.getElementById('studentDrop').style.display ='none';
    document.getElementById('displayScoresByStudent').style.display ='none';

    document.getElementById("quizDrop").style.display = "block";
}

function showStudentDrop() {
    document.getElementById('quizDrop').style.display ='none';
    document.getElementById('displayScoresByQuiz').style.display ='none';

    document.getElementById("studentDrop").style.display = "block";
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
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding quizid)
        cell = tr[i].getElementsByTagName("td")[0];

        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
        }
    }
}

function searchStudent() {
    document.getElementById("displayScoresByQuiz").style.display = "none";
    document.getElementById("displayScoresByStudent").style.display = "block";

    // get value of dropdown item (studentID)
    var e = document.getElementById("studentDropdown");
    var studentID = e.options[e.selectedIndex].value;

    // filter table by studentID
    var filter, table, tr, i;
    filter = studentID;
    table = document.getElementById("studentTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        // hide the row initially
        tr[i].style.display = "none";
    
        // element in 1st column (hidden column holding studentid)
        cell = tr[i].getElementsByTagName("td")[0];
        
        // if element is equal to filter, display
        if (cell.innerHTML == filter) {
            tr[i].style.display = "";
        }
    }
}

function deleteStudentScore(qid, sid){
    $.ajax({
        url: '/removeStudent/' + qid + '/' + sid,
        type: 'DELETE',
        success: function(result){
          window.location.reload(true);
        }
    })
};