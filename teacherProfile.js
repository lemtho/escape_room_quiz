module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	function getTeacherName(res, mysql, context, complete){
		mysql.pool.query("SELECT firstName, lastName FROM teacher WHERE teacherID = 1", function(error, results, fields){
			if(error){
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
	
			context.teacher = results; 
			complete(); 
		});
	}
		
	router.get("/", function(req, res){
		var callbackCount = 0; 
		var context = {};
		var mysql = req.app.get('mysql');
		getTeacherName(res, mysql, context, complete);
	
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.render('teacherProfile', context);
			}
		}
	});
	
	return router;
}();