module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("teacherScoreboard", {title: "Teacher Scoreboard"});
	});
	
	return router;
}();