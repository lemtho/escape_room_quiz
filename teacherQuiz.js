module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("teacherQuiz", {title: "Teacher Quiz"});
	});
	
	return router;
}();