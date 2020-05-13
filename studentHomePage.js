module.exports = function()
{
	var express = require("express");
	var router = express.Router();
	var session = require("express-session");
	
	router.get("/", function(req, res){
		
		// TEST: Output request data.
		// console.log(req.session);
		
		// IF user is already signed in (i.e., req.session.studentID exists)...
		if (req.session.studentID)
		{
			/* Declare a local variable that stores the user's id and user's first name obtained from 
			session data. User's first name will be displayed on page. */
			var studentID = req.session.studentID;
			var firstName = req.session.firstName;
		
			res.render("studentHomePage", {title: "Student Home Page", id: studentID, user: firstName});
		}

		// ELSE user is not signed in...
		else
		{
			// Redirect user to home page.
			res.redirect("/");
		}
	});

	// On studentHomePage/playGame load...
	router.get("/playGame", function(req, res){
		
		// TEST: Output session data.
		// console.log(req.session);
		
		// IF user is already signed in and quiz ID is valid...
		if (req.session.studentID > 0 & req.session.quizID > 0)
		{
			var mysql = req.app.get("mysql");
			
			// Declare and initialize an object called context.
			var context = {};
			
			/* Declare a local variable that stores the user's id and user's first name obtained from 
			session data. */
			var studentID = req.session.studentID;
			var quizID = req.session.quizID;

			// Store studentID, quizID, web page title, studentGamePage boolean inside context object.
			context.title = "Student Game Page";
			context.studentID = studentID;
			context.quizID = quizID;
			context.studentGamePage = "true"

			/* Query the database for the questions found under the quizID and store the results 
			inside context object. */
			mysql.pool.query("SELECT * from question WHERE quizID = ?", [quizID], function(error, results, fields)
			{
				if (error)
				{
					res.write(JSON.stringify(error));
					res.end();
				}
				
				// Convert JSON object to JSON string and store inside context object.
				context.JSONString = JSON.stringify(results);

				res.render("studentGame", context);
			});
		}

		// ELSE user is not signed in or have valid quiz code...
		else
		{
			// Redirect user to home page.
			res.redirect("/");
		}
	});

	// IF user hits "Go" button to play the game...
	router.post("/playGame", function(req, res){

		var mysql = req.app.get("mysql");
		
		// TEST: Output to console the quiz code user inputted.
		// console.log(req.body);

		/* Declare a local variable that stores the user's id and 
		a local variable that stores the quiz id. */
		var quizID = req.body.quizID;

		// Check the database whether quizID exists.
		mysql.pool.query("SELECT `name` FROM `quiz` WHERE `quizID` = ?", [quizID], function(err, results, fields)
		{
			// IF query returned a result...
			if (results.length > 0)
			{
				// Store the quiz ID in sessions data.
				req.session.quizID = quizID;

				// Redirect user to student game page.
				res.redirect("/studentHomePage/playGame");
			}

			/* ELSE, query did not return a result. Send a HTTP 400 status code and error message
			to client. */
			else
			{
				res.status(400).send("Invalid quiz code! Please try again.")
			} 
		});
	});

	// Once the game sends data to the server, execute the commands in this route.
	router.post("/sendResults", function(req, res){

		var mysql = req.app.get("mysql");
		
		// TEST: Output to console data received from the game.
		console.log(req.body);

		/* Declare and store values from the request to these local variables that will
		be referenced in the query to send to the database. */
		var studentID = req.body.studentID;
		var questionID = req.body.questionID;
		var studentAnswer = req.body.studentAnswer;
		var questionPT = req.body.questionPT;
		var dateTaken = req.body.dateTaken;
		var quizID = req.body.quizID;

		/* Create a query to INSERT a record into the student_question table in the database
		with the following values extracted from the request. */
		mysql.pool.query("INSERT INTO student_question VALUES (?, ?, ?, ?, ?, ?);", [studentID, questionID, studentAnswer, questionPT, dateTaken, quizID], function(error, results, fields)
		{
			if (error)
			{
				res.write(JSON.stringify(error));
				// TEST: Output error message in console.
				// console.log(JSON.stringify(error));
				res.end();
			}
		});
	});
	
	return router;
}();