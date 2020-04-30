// On load, hide test divs.
document.getElementById("quizName").style.display = "none";
document.getElementById("quizID").style.display = "none";

// var testObject = { "name": "Thomas", "age": "30" };

var quizName = document.getElementById("quizName").textContent;
var quizID = document.getElementById("quizID").textContent;

var jsonString = "{ \"name\": \"" + quizName + "\", \"age\": \"" + quizID + "\" }";

// console.log(testObject);
// var jsonString = JSON.stringify(testObject);
// alert(jsonString);