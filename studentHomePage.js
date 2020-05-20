module.exports = function()
{
	var express = require("express");
	var router = express.Router();
	var session = require("express-session");

	// Declare additional variables used under this function().
	var questionsAnswered = 0; // 0 for false.
	var quizID;
	
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
			mysql.pool.query("SELECT * from question WHERE quizID = ?;", [quizID], function(error, results, fields)
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

		// ELSE user is not signed in, does not have valid quiz code, or took the quiz already...
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
		a local variable that stores the quiz code user inputted. */
		var quizCode = req.body.quizID;
		var studentID = req.session.studentID;

		// Convert quiz code to quiz ID.
		quizID = (quizCode - 89) / 273;

		// Check the database whether quizID exists.
		mysql.pool.query("SELECT `name` FROM `quiz` WHERE `quizID` = ?;", [quizID], function(err, results, fields)
		{
			// IF query returned a result...
			if (results.length > 0)
			{
				// Check whether student took the quiz.
				mysql.pool.query("SELECT * FROM student_question WHERE quizID = ? AND studentID = ?;", [quizID, studentID], function(err, rows, fields)
				{
					// IF student did not take the quiz...
					if (rows.length <= 0)
					{
						// Store the quiz ID in sessions data.
						req.session.quizID = quizID;

						// Redirect user to student game page.
						res.redirect("/studentHomePage/playGame");
					}

					// ELSE, student took the quiz. Send a HTTP 400 status code and error message to client.
					else
					{
						res.status(400).send("Error! It appears you took this quiz already. Please ask your teacher if you have any questions about this quiz.");
					}
				});
			}

			/* ELSE, query did not return a result. Send a HTTP 400 status code and error message
			to client. */
			else
			{
				res.status(400).send("Invalid quiz code! Please try again.")
			} 
		});
	});

	/* Once the game sends second set of data (i.e., user's response to the first question) 
	to the server, execute the commands in this route. */
	router.post("/sendResults1", function(req, res){
		
		var mysql = req.app.get("mysql");

		// TEST: Output to console data received from the game.
		// console.log(req.body);

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

			// ELSE, no error.
			else
			{
				// Reset quizID stored in session data to 0 so user cannot reload the page and take the quiz again.
				req.session.quizID = 0;
	
				// Save the session data.
				req.session.save();
			}
		});
	});

	/* Once the game sends second set of data (i.e., user's response to the nine questions) 
	to the server, execute the commands in this route. */
	router.post("/sendResults2", function(req, res){
		
		var mysql = req.app.get("mysql");

		// TEST: Output to console data received from the game.
		console.log(req.body);

		/* Declare and store values from the request to these local variables that will
		be referenced in the query to send to the database. */
		var studentID = req.body.studentID;
		var dateTaken = req.body.dateTaken;
		var quizID = req.body.quizID;
		
		var questionID2 = req.body.questionID2;
		var studentAnswer2 = req.body.studentAnswer2;
		var questionPT2 = req.body.questionPT2;

		var questionID3 = req.body.questionID3;
		var studentAnswer3 = req.body.studentAnswer3;
		var questionPT3 = req.body.questionPT3;

		var questionID4 = req.body.questionID4;
		var studentAnswer4 = req.body.studentAnswer4;
		var questionPT4 = req.body.questionPT4;

		var questionID5 = req.body.questionID5;
		var studentAnswer5 = req.body.studentAnswer5;
		var questionPT5 = req.body.questionPT5;

		var questionID6 = req.body.questionID6;
		var studentAnswer6 = req.body.studentAnswer6;
		var questionPT6 = req.body.questionPT6;

		var questionID7 = req.body.questionID7;
		var studentAnswer7 = req.body.studentAnswer7;
		var questionPT7 = req.body.questionPT7;

		var questionID8 = req.body.questionID8;
		var studentAnswer8 = req.body.studentAnswer8;
		var questionPT8 = req.body.questionPT8;

		var questionID9 = req.body.questionID9;
		var studentAnswer9 = req.body.studentAnswer9;
		var questionPT9 = req.body.questionPT9;

		var questionID10 = req.body.questionID10;
		var studentAnswer10 = req.body.studentAnswer10;
		var questionPT10 = req.body.questionPT10;
		
		/* Create a query to INSERT a record into the student_question table in the database
		with the following values extracted from the request. */
		mysql.pool.query("INSERT INTO student_question VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?);", [studentID, questionID2, studentAnswer2, questionPT2, dateTaken, quizID, studentID, questionID3, studentAnswer3, questionPT3, dateTaken, quizID, studentID, questionID4, studentAnswer4, questionPT4, dateTaken, quizID, studentID, questionID5, studentAnswer5, questionPT5, dateTaken, quizID, studentID, questionID6, studentAnswer6, questionPT6, dateTaken, quizID, studentID, questionID7, studentAnswer7, questionPT7, dateTaken, quizID, studentID, questionID8, studentAnswer8, questionPT8, dateTaken, quizID, studentID, questionID9, studentAnswer9, questionPT9, dateTaken, quizID, studentID, questionID10, studentAnswer10, questionPT10, dateTaken, quizID], function(error, results, fields)
		{	if (error)
			{
				res.write(JSON.stringify(error));
				res.end();
			}

			// ELSE, no error.
			else
			{
				// IF quizID stored in session data has not been resetted...
				if (req.session.quizID > 0)
				{
					// Reset quizID stored in session data to 0 so user cannot reload the page and take the quiz again.
					req.session.quizID = 0;
		
					// Save the session data.
					req.session.save();
				}

				// Set questionsAnswered flag value to 1. 1 = true.
				questionsAnswered = 1;

				// TEST: Output to console once server sets questionsAnswered flag to 1.
				console.log("Set questionsAnswered to 1.");
			}
		});
	});

	router.post("/checkGameCompleted", function(req, res){

		// IF the user answered the last question...
		if (questionsAnswered == 1)
		{
			// TEST: Output to console that program will execute the command under this condition. 
			console.log("Redirecting user to the quiz results page...");

			// Reset questionsAnswered to 0.
			questionsAnswered = 0;
			
			// Redirect user to student quiz results page for that quizID under studentID.
			res.redirect("/studentScoreboard/" + quizID + "/" + req.session.studentID);
		}
	});
	
	return router;
}();