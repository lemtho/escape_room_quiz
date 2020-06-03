module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	// still need to get specific teacher id
	function getTeacherName(res, mysql, id, context, complete){
		var sql = "SELECT * FROM teacher WHERE teacherID = ?";
		var inserts = [id]
		mysql.pool.query(sql, inserts, function(error, results, fields){
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
		if (req.session.teacherID) {
			var teacherID = req.session.teacherID;
			var callbackCount = 0; 
			var context = {};
			var mysql = req.app.get('mysql');
			getTeacherName(res, mysql, teacherID, context, complete);
		
			function complete(){
				callbackCount++;
				if(callbackCount >= 1){
					context.title = 'Teacher Profile Page';
					res.render('teacherProfile', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
	});

	// update teacher name
    router.post('/', function(req, res){
		if (req.session.teacherID) {
			var teacherID = req.session.teacherID;
			var mysql = req.app.get('mysql');
			var sql = 'UPDATE teacher SET firstName = ?, lastName = ? WHERE teacherID = ?';
			var inserts = [req.body.newFirstName, req.body.newLastName, teacherID];

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
			res.redirect('/');
		}
	});
	
	// update teacher password
	router.put('/', function(req, res){
		if (req.session.teacherID) {
			var teacherID = req.session.teacherID;
			var mysql = req.app.get('mysql');
			var sql = 'UPDATE teacher SET password = ? WHERE teacherID = ?';
			var inserts = [req.body.newPassword, teacherID];

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