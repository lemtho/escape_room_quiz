module.exports = function()
{
	var express = require("express");
	var router = express.Router();
	var session = require("express-session");
	
	router.get("/", function(req, res){

		// Destroy the session.
		req.session.destroy();
		
		// Redirect user to home page.
		res.redirect("/");
	});
	
	return router;
}();