module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	function getStudentName(res, mysql, context, complete){
		mysql.pool.query("SELECT firstName, lastName FROM student WHERE studentID = 1", function(error, results, fields){
			if(error){
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
	
			context.student = results; 
			complete(); 
		});
	}
		
	router.get("/", function(req, res){
		var callbackCount = 0; 
		var context = {};
		var mysql = req.app.get('mysql');
		getStudentName(res, mysql, context, complete);
	
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.render('studentProfile', context);
			}
		}
	});
	return router;
}();