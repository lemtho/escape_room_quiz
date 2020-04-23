module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	function getTeacherStudents(res, mysql, id, context, complete){
		var sql = "SELECT s.studentID, s.lastName, s.firstName, q.quizID, q.name FROM student AS s LEFT JOIN (SELECT quizID, studentID FROM student_question GROUP BY quizID, studentID) sq USING (studentID) JOIN quiz AS q ON sq.quizID = q.quizID WHERE q.teacherID = ? ORDER BY name;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
	
			context.students = results; 
			complete(); 
		});
	}

	function getStudentResults(res, mysql, qid, sid, context, complete) {
		var sql = "SELECT s.firstName, s.lastName, quest.questionID, quest.question, quest.answer, studentAnswer, questionPt, q.name FROM student AS s LEFT JOIN (SELECT questionID, studentID, studentAnswer, questionPT FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ?;";
		var inserts = [qid, sid];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.questionResult = results;
			complete();
		});
	}

	function getStudentScore(res, mysql, qid, sid, context, complete) {
		var sql = "SELECT SUM(questionPT) AS  actual_score, COUNT(questionPT) AS count FROM student_question WHERE quizID = ? AND studentID = ?;";
		var inserts = [qid, sid];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.finalScore = results;
			complete();
		});
	}

	function getQuizHeader(res, mysql, qid, sid, context, complete) {
		var sql = "SELECT DISTINCT s.firstName, s.lastName, q.name, dateTaken FROM student AS s LEFT JOIN (SELECT questionID, studentID, dateTaken FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ?;";
		var inserts = [qid, sid];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
			
			context.header = results;
			complete();
		});
	}
		
	router.get("/", function(req, res){
		if (req.session.teacherID) {
			var teacherID = req.session.teacherID;
			var callbackCount = 0; 
			var context = {};
			var mysql = req.app.get('mysql');
			getTeacherStudents(res, mysql, teacherID, context, complete);
		
			function complete(){
				callbackCount++;
				if(callbackCount >= 1){
					context.title = 'My Students';
					res.render('teacherStudents', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
	});

	// to view student results
	router.get('/:qid/:sid', function(req, res){
		if (req.session.teacherID) {
			var callbackCount = 0;
			var context = {};
			var mysql = req.app.get('mysql');
			getStudentResults(res, mysql, req.params.qid, req.params.sid, context, complete); 
			getStudentScore(res, mysql, req.params.qid, req.params.sid, context, complete);
			getQuizHeader(res, mysql, req.params.qid, req.params.sid, context, complete);
			
			function complete(){
				callbackCount++;
				if(callbackCount >= 3){
					context.title = 'Quiz Results';
					res.render('teacherStudentResults', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
	});

	return router;
}();