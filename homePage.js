module.exports = function()
{
	var express = require('express');
	var router = express.Router();

	// Route to render the home page.
	router.get("/", function(req, res)
	{	
		res.render("homePage", {title: "2Kool4Skool"});
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
			mysql.pool.query("SELECT `studentID` FROM `student` WHERE `email` = ? AND `password` = ?;", [email, password], function(err, results, fields)
			{	
				if (results.length > 0)
				{
					// Do something with sessions here.
					
					// Redirect user to student home page.
					res.redirect("/studentHomePage");
				}

				else
				{
					res.send("Invalid login credentials! Please go back and reenter your email and password.");
				}
			});
		}
		
		// ELSE IF user is a teacher...
		else if ((email != "") & (password != "") & (accountType == "T"))
		{
			mysql.pool.query("SELECT `teacherID` FROM `teacher` WHERE `email` = ? AND `password` = ?;", [email, password], function(err, results, fields)
			{
				if (results.length > 0)
				{
					// Do something with sessions here.

					// Redirect user to teacher home page.
					res.redirect("/teacherHomePage");
				}

				else
				{
					res.send("Invalid login credentials! Please go back and reenter your email and password.");
				}
			});
		}

		// ELSE user did not provide an email and/or password...
		else
		{
			res.send("Invalid login credentials! Please go back and reenter your email and password.");
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
					res.send(email + " is already registered to an account! Please go back and enter a different email.");
				}

				// ELSE email does not exist...
				else
				{
					// Add student account information in database.
					mysql.pool.query("INSERT INTO `student` (`firstName`, `lastName`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?, ?);", [firstName, lastName, email, password, accountType], function(err, results, fields)
					{
						// Do something with sessions here.
						
						// Redirect user to student home page.
						res.redirect("/studentHomePage");
					});
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
					res.send(email + " is already registered to an account! Please go back and enter a different email.");
				}

				// ELSE email does not exist...
				else
				{
					// Add student account information in database.
					mysql.pool.query("INSERT INTO `teacher` (`firstName`, `lastName`, `email`, `password`, `userType`) VALUES (?, ?, ?, ?, ?);", [firstName, lastName, email, password, accountType], function(err, results, fields)
					{
						// Do something with sessions here.
						
						// Redirect user to student home page.
						res.redirect("/teacherHomePage");
					});
				}
			});
		}

		// ELSE user left at least one required field blank...
		else
		{
			res.send("Please go back and reenter all required information!");
		}
	});
	
	return router;
}();