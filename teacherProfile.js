module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	// still need to get specific teacher id
	function getTeacherName(res, mysql, context, complete){
		mysql.pool.query("SELECT * FROM teacher WHERE teacherID = 3", function(error, results, fields){
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

	// update teacher name NOT WORKING
	router.post('/edit', (req, res) => {  
		var sql = "SELECT firstName, lastName, email, password, userType FROM teacher WHERE teacherID = 3";
		mysql.pool.query(sql, function (err, result) {
			if (err) {
				next(err);
				return;
			}
			if (result.length == 1) {
				var curVals = result[0];
				var sql2 = "UPDATE teacher SET firstName=?, lastName=?, email=?, password=?, phone=? WHERE teacherID=?";
				mysql.pool.query(sql2,
					[req.body.firstName || curVals.firstName, req.body.lastName || curVals.lastName, req.body.email || curVals.email, req.body.password || curVals.password, req.body.userType || curVals.userType, req.body.id],
					function (err, result) {
						if (err) {
							next(err);
							return;
						}
						res.render('teacherProfile');
					});
			}
		});
	});
	
	return router;
}();