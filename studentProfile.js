module.exports = function()
{
	var express = require('express');
	var router = express.Router();

	function getStudentName(res, mysql, id, context, complete){
		var sql = "SELECT * FROM student WHERE studentID = ?";
		var inserts = [id]
		mysql.pool.query(sql, inserts, function(error, results, fields){
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
		if (req.session.studentID) {
			var studentID = req.session.studentID;
			var callbackCount = 0; 
			var context = {};
			var mysql = req.app.get('mysql');
			getStudentName(res, mysql, studentID, context, complete);
		
			function complete(){
				callbackCount++;
				if(callbackCount >= 1){
					context.title = 'My Profile';
					res.render('studentProfile', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
	});

	// update student name
    router.put('/', function(req, res){
		if (req.session.studentID) {
			var studentID = req.session.studentID;
			var mysql = req.app.get('mysql');
			var sql = 'UPDATE student SET firstName = ?, lastName = ? WHERE studentID = ?';
			var inserts = [req.body.newFirstName, req.body.newLastName, studentID];

			sql = mysql.pool.query(sql, inserts, function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end(); 
				}
				else{
					res.status(200);
					res.end(); 
				}
			});
		}
		else {
			res.redirect("/");
		}
	});
	
	// update student password
	router.put('/', function(req, res){
		if (req.session.studentID) {
			var studentID = req.session.studentID;
			var mysql = req.app.get('mysql');
			var sql = 'UPDATE student SET password = ? WHERE studentID = ?';
			var inserts = [req.body.newPassword, studentID];

			sql = mysql.pool.query(sql, inserts, function(error, results, fields){
				if(error){
					res.write(JSON.stringify(error));
					res.end(); 
				}
				else{
					res.status(200);
					res.end(); 
				}
			});
		}
		else {
			res.redirect("/");
		}
    });
	
	return router;
}();