// On load hide the <p> elements.
document.getElementById("studentID").style.display = "none";
document.getElementById("jsonString").style.display = "none";

// On load, call the notifyGameComplete() function.
notifyGameComplete();

// Get the student ID.
var studentID = document.getElementById("studentID").textContent;

// Get the JSON string/data.
var jsonString = document.getElementById("jsonString").textContent;

// Convert JSON string/data to JavaScript object.
var jsonObject = JSON.parse(jsonString);

// TEST: Output to console data from JSON string and object.
// console.log(jsonString);
// console.log(jsonObject[0]);
// console.log(jsonObject[0].question);

/* Randomize order of questions and store in new object called questions.
Excerpted the following FOR-LOOP code from a Fisher-Yates-Durstenfeld shuffle
referenced in a post at https://stackoverflow.com/questions/3718282/javascript-shuffling-objects-inside-an-object-randomize
*/
for (var i = 0; i < jsonObject.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (jsonObject.length - i));
    
    var temp = jsonObject[j];
    jsonObject[j] = jsonObject[i];
    jsonObject[i] = temp;
}

// TEST: Output the shuffled jsonObject JavaScript object.
// console.log(JSON.stringify(jsonObject));

// Select the first ten questions and store in new array called newJSONObject.
newJSONObject = [];

for (i = 0; i < 10; i++)
{
    newJSONObject.push(jsonObject[i]);
}

// TEST: Output the ten selected shuffled jsonObject JavaScript object.
// console.log(JSON.stringify(newJSONObject));

// Convert JavaScript object to JSON string/data.
var questions = JSON.stringify(newJSONObject);

// Make into JSON (string) format.
questions = "{\"Questions\":" + questions + "}";

/* Due to asynchronous nature of JavaScript, set a 3-second delay to allow the game to load before
sending JSON string to the game. */
setTimeout(function() 
{
    /* Send JSON data and student ID to Unity game. The unityInstance object is already declared (globally) in
    the UnityLoader.js located in game/Build/UnityLoader.js */
    unityInstance.SendMessage('Main Camera', 'getJSONData', questions);
    unityInstance.SendMessage('Main Camera', 'getStudentID', studentID);
}, 3000);

// This function sends a HTTP request to the server, alerting the client to redirect once user finishes playing the game.
function notifyGameComplete()
{
    /* Referenced "How to send a JSON object to a server using Javascript?" from
    https://www.geeksforgeeks.org/how-to-send-a-json-object-to-a-server-using-javascript/ 
    to help the programmer write the code inside the notifyGameComplete() function that sends data from 
    client to server and receives data from server to client. */
    
    // Create a local variable to store a flag of value 0.
    var flag = 0;
    
    // Create a XMLHttpRequest object.
    var req = new XMLHttpRequest();

    // Define the URL to send data to.
    var url = "/studentHomePage/checkGameCompleted";

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
        redirect user to the responseURL site. (i.e., student quiz results page). */
        if (req.readyState == 4 & req.status == 200)
        {
            window.location = req.responseURL;
        }
    }
    
    // Convert JSON data to string.
    var data = JSON.stringify({"isGameComplete": flag});

    // Send data with the request.
    req.send(data);
}