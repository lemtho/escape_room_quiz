module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("studentProfile", {title: "Student Profile"});
	});
	
	return router;
}();