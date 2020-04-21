module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	function getTeacherStudents(res, mysql, context, complete){
		mysql.pool.query("SELECT DISTINCT firstName, lastName, name FROM student INNER JOIN student_question ON student_question.studentID = student.studentID INNER JOIN quiz on quiz.quizID = student_question.quizID WHERE teacherID = 3 ORDER BY lastName ASC;", function(error, results, fields){
			if(error){
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
	
			context.students = results; 
			complete(); 
		});
	}
		
	router.get("/", function(req, res){
		var callbackCount = 0; 
		var context = {};
		var mysql = req.app.get('mysql');
		getTeacherStudents(res, mysql, context, complete);
	
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				res.render('teacherStudents', context);
			}
		}
	});

	return router;
}();