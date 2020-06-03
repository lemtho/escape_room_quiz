module.exports = function()
{
	var express = require("express");
	var router = express.Router();
	var session = require("express-session");

	// Route to render the home page.
	router.get("/", function(req, res)
	{	
		// TEST: Output session data.
		// console.log(req.session);
		
		// IF user is already logged in and a student, redirect user to student home page.
		if (req.session.accountType == "S")
		{
			res.redirect("/studentHomePage");	
		}

		// ELSE IF user is already logged in and a teacher, redirect user to teacher home page.
		else if (req.session.accountType == "T")
		{
			res.redirect("/teacherHomePage");
		}

		// ELSE IF user is not logged in, render homePage.
		else
		{
			res.render("homePage", {title: "2Kool4Skool"});
		}
	});

	// Route to log user in.
	router.post("/login", function(req, res){

		var mysql = req.app.get("mysql");
		
		var email = req.body.email;
		var password = req.body.password;
		var accountType = req.body.userType;

		// If user is a student...
		if ((email != "") & (password != "") & (accountType == "S"))
		{
			mysql.pool.query("SELECT `studentID`, `firstName`, `userType` FROM `student` WHERE `email` = ? AND `password` = ?;", [email, password], function(err, results, fields)
			{	
				// IF query returned a result...
				if (results.length > 0)
				{
					// TEST: Output query results.
					// console.log(results);
					
					// Store student ID, student's first name, and user type in sessions data.
					req.session.studentID = results[0].studentID;
					req.session.firstName = results[0].firstName;
					req.session.accountType = results[0].userType;

					// TEST: Output session data.
					// console.log(req.session);
					
					// Redirect user to student home page.
					res.redirect("/studentHomePage");
				}

				/* ELSE query did not return a result. Send a HTTP 400 status code and error message
				to client. */
				else
				{
					res.status(400).send("Invalid login credentials! Please try again.")
				}
			});
		}
		
		// ELSE IF user is a teacher...
		else if ((email != "") & (password != "") & (accountType == "T"))
		{
			mysql.pool.query("SELECT `teacherID`, `firstName`, `userType` FROM `teacher` WHERE `email` = ? AND `password` = ?;", [email, password], function(err, results, fields)
			{
				// IF query returned a result...
				if (results.length > 0)
				{
					// Store teacher ID, teacher's first name, and user type in sessions data.
					req.session.teacherID = results[0].teacherID;
					req.session.firstName = results[0].firstName;
					req.session.accountType = results[0].userType;

					// Redirect user to teacher home page.
					res.redirect("/teacherHomePage");
				}

				/* ELSE query did not return a result. Send a HTTP 400 status code and error message
				to client. */
				else
				{
					res.status(400).send("Invalid login credentials! Please try again.")
				}
			});
		}

		// ELSE user did not provide an email and/or password...
		else
		{
			// Send a HTTP 400 status code and error message to client.
			res.status(400).send("Invalid login credentials! Please try again.")
		}
	});

	// Route to create user account.
	router.post("/create", function(req, res){

		var mysql = req.app.get("mysql");
		
		var firstName = req.body.firstName;
		var lastName = req.body.lastName;
		var email = req.body.email;
		var password = req.body.password;
		var accountType = req.body.userType;

		// If user is a student...
		if ((firstName != "") & (lastName != "") & (email != "") & (password != "") & (accountType == "S"))
		{	
			// Check whether email exists...
			mysql.pool.query("SELECT `email` FROM `student` WHERE `email` = ?;", [email], function(err, results, fields)
			{	
				// IF email exists...
				if (results.length > 0)
				{
					// Send a HTTP 400 status code and error message to client.
					res.status(400).send(email + " is already registered to an account! Please enter a different email.");
				}

				// ELSE email does not exist...
				else
				{
					// Check for valid password. IF password is valid...
					if (password.length >= 8 & password.length <= 12 & password.search(" ") == -1)
					{
						// Add student account information in database.
						mysql.pool.query("INSERT INTO `student` (`firstName`, `lastName`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?, ?);", [firstName, lastName, email, password, accountType], function(err, results, fields)
						{
							// Get the student ID from querying the database.
							mysql.pool.query("SELECT `studentID`, `firstName`, `userType` FROM `student` WHERE `email` = ? AND `password` = ?;", [email, password], function(err, rows, fields)
							{	
								// IF query returned a result...
								if (rows.length > 0)
								{	
									// Store student ID, student's first name, and user type in sessions data.
									req.session.studentID = rows[0].studentID;
									req.session.firstName = rows[0].firstName;
									req.session.accountType = rows[0].userType;
									
									// Redirect user to student home page.
									res.redirect("/studentHomePage");
								}
							});
						});
					}

					// ELSE, password is invald...
					else
					{
						// Send a HTTP 400 status code and error message to client.
						res.status(400).send("The password you entered is invalid. Please enter a different password with 8 to 12 characters and with no spaces.");
					}
				}
			});
		}
		
		// ELSE IF user is a teacher...
		else if ((firstName != "") & (lastName != "") & (email != "") & (password != "") & (accountType == "T"))
		{	
			// Check whether email exists...
			mysql.pool.query("SELECT `email` FROM `teacher` WHERE `email` = ?;", [email], function(err, results, fields)
			{	
				// IF email exists...
				if (results.length > 0)
				{
					// Send a HTTP 400 status code and error message to client.
					res.status(400).send(email + " is already registered to an account! Please enter a different email.");
				}

				// ELSE email does not exist...
				else
				{
					// Check for valid password. IF password is valid...
					if (password.length >= 8 & password.length <= 12 & password.search(" ") == -1)
					{
						// Add teacher account information in database.
						mysql.pool.query("INSERT INTO `teacher` (`firstName`, `lastName`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?, ?);", [firstName, lastName, email, password, accountType], function(err, results, fields)
						{
							// Get the teacher ID from querying the database.
							mysql.pool.query("SELECT `teacherID`, `firstName`, `userType` FROM `teacher` WHERE `email` = ?;", [email], function(err, rows, fields)
							{
								// IF query returned a result...
								if (rows.length > 0)
								{
									// Store teacher ID, teacher's first name, and user type in sessions data.
									req.session.teacherID = rows[0].teacherID;
									req.session.firstName = rows[0].firstName;
									req.session.accountType = rows[0].userType;
							
									// Redirect user to teacher home page.
									res.redirect("/teacherHomePage");
								}
							});
						});
					}

					// ELSE, password is invalid...
					else
					{
						// Send a HTTP 400 status code and error message to client.
						res.status(400).send("The password you entered is invalid. Please enter a different password with 8 to 12 characters and with no spaces.");
					}
				}
			});
		}

		// ELSE, user left at least one required field blank...
		else
		{
			// Send a HTTP 400 status code and error message to client.
			res.status(400).send("Please enter all required information!");
		}
	});
	
	return router;
}();