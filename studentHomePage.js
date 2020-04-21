module.exports = function()
{
	var express = require("express");
	var router = express.Router();
	var session = require("express-session");
	
	router.get("/", function(req, res){
		
		// TEST: Output request data.
		// console.log(req.session);
		
		/* Declare a local variable that stores the user's first name obtained from 
		session data. User's first name will be displayed on page. */
		var firstName = req.session.firstName;
		
		res.render("studentHomePage", {title: "Student Home Page", user: firstName});
	});
	
	return router;
}();