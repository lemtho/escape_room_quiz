module.exports = function()
{
	var express = require('express');
	var router = express.Router();

	function getScores(res, mysql, id, context, complete){
		var sql = "SELECT s.firstName,s.lastName, s.studentID, q.name, q.quizID, actual_score FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID LEFT JOIN(SELECT studentID,quizID, SUM(questionPT) AS actual_score FROM student_question GROUP BY studentID, quizID) stu_quiz USING (quizID) JOIN student AS s ON stu_quiz.studentID = s.studentID WHERE t.teacherID = ?;";
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

	function getQuizDrop(res, mysql, id, context, complete) {
		var sql = "SELECT q.quizID, q.name FROM quiz AS q JOIN teacher AS t ON q.teacherID = t.teacherID WHERE t.teacherID = ? ORDER BY name ASC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.quizDrop = results;
			complete();
		});
	}

	function getStudentDrop(res, mysql, id, context, complete) {
		var sql = "SELECT DISTINCT s.studentID, s.lastName, s.firstName FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID JOIN (SELECT studentID, quizID FROM student_question GROUP BY studentID, quizID) sq USING (quizID) JOIN student AS s ON sq.studentID = s.studentID WHERE t.teacherID = ? ORDER BY lastName ASC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.studentDrop = results;
			complete();
		});
	}

	function getQuizScores(res, mysql, id, context, complete) {
		var sql = "SELECT DISTINCT s.studentID, s.lastName, s.firstName, actual_score, q.quizID FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID JOIN (SELECT studentID, quizID, SUM(questionPT) as actual_score FROM student_question GROUP BY studentID, quizID) sq USING (quizID) JOIN student AS s ON sq.studentID = s.studentID WHERE t.teacherID = ? ORDER BY lastName ASC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.quizScore = results;
			complete();
		});
	}

	function getStudentScores(res, mysql, id, context, complete) {
		var sql = "SELECT DISTINCT s.studentID, q.quizID, q.name, actual_score FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID JOIN (SELECT studentID, quizID, SUM(questionPT) as actual_score FROM student_question GROUP BY studentID, quizID) sq USING (quizID) JOIN student AS s ON sq.studentID = s.studentID WHERE t.teacherID = ? ORDER BY name ASC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.studentScore = results;
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
		var sql = "SELECT DISTINCT s.firstName, s.lastName, q.name, lastTakenDate FROM student AS s LEFT JOIN (SELECT questionID, studentID, DATE_FORMAT(dateTaken, '%m/%d/%Y %h:%i %p') AS lastTakenDate FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ?;";
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
			getScores(res, mysql, teacherID, context, complete);
			getQuizDrop(res, mysql, teacherID, context, complete);
			getStudentDrop(res, mysql, teacherID, context, complete);
			getQuizScores(res, mysql, teacherID, context, complete);
			getStudentScores(res, mysql, teacherID, context, complete);

			function complete() {
				callbackCount++;
				if (callbackCount >= 5) {
					context.title = "Scoreboard";
					res.render('teacherScoreboard', context);
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