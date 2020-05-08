// Hide the test <p> element.
document.getElementById("jsonString").style.display = "none";

// Get the JSON string.
var jsonString = document.getElementById("jsonString").textContent;
var jsonObject = JSON.parse(jsonString);

// TEST: Output to console data from JSON string and object.
// console.log(jsonObject[0]);
// console.log(jsonObject[0].question);

// Get the second question from the JSON string.
var question = JSON.stringify(jsonObject[1]);

// /* Randomize order of questions and store in new object called questions.
// Excerpted the following FOR-LOOP code from a Fisher-Yates-Durstenfeld shuffle
// referenced in a post at https://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
// */
// for (var i = 0; i < jsonObject.length - 1; i++) {
//     var j = i + Math.floor(Math.random() * (jsonObject.length - i));
    
//     var temp = jsonObject[j];
//     jsonObject[j] = jsonObject[i];
//     jsonObject[i] = temp;
// }

// TEST: Output the shuffled jsonObject object.
// console.log(JSON.stringify(jsonObject));

var questions = JSON.stringify(jsonObject);

/* Due to asynchronous nature of JavaScript, set 3-second delay to allow the game to load before
sending JSON string to the game. */
setTimeout(function() 
{
    /* Send JSON to Unity game. The unityInstance object is already declared (globally) in
    the UnityLoader.js located in game/Build/UnityLoader.js */
    unityInstance.SendMessage('Walls', 'getJSON', question);
}, 3000);