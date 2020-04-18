module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("teacherHomePage", {title: "Teacher Home Page"});
	});
	
	return router;
}();