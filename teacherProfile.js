module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("teacherProfile", {title: "Teacher Profile"});
	});
	
	return router;
}();