module.exports = function()
{
	var express = require('express');
	var router = express.Router();

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
		var sql = "SELECT DISTINCT s.studentID, s.lastName, s.firstName, actual_score, q.quizID FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID JOIN (SELECT studentID, quizID, SUM(questionPT) as actual_score FROM student_question GROUP BY studentID, quizID) sq USING (quizID) JOIN student AS s ON sq.studentID = s.studentID WHERE t.teacherID = ? ORDER BY firstName ASC;";
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
		var sql = "SELECT s.firstName, s.lastName, quest.questionID, quest.question, quest.answer, questionOrder, studentAnswer, questionPt, q.name FROM student AS s LEFT JOIN (SELECT questionID, studentID, studentAnswer, questionPT, questionOrder FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ? ORDER BY questionOrder ASC;";
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
		var sql = 'SELECT DISTINCT s.firstName, s.lastName, q.name, DATE_FORMAT(dateTaken, "%m/%d/%Y") AS lastTakenDate FROM student AS s LEFT JOIN (SELECT questionID, studentID, dateTaken FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ?;';
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
		
		// TEST: Print to console sessions data.
		// console.log(req.session);

		if (req.session.teacherID) {
			var teacherID = req.session.teacherID;
			var callbackCount = 0;
			var context = {};

			// If this route originated from teacherQuiz page...
			if (req.session.fromTeacherQuizPage == true)
			{
				context.fromTeacherQuizID = req.session.fromTeacherQuizID;
				context.fromTeacherQuizName = req.session.fromTeacherQuizName;
				context.fromTeacherHomeID = req.session.fromTeacherHomeID;

				// TEST: Learn sessions data...manipulate sessions data.
				/* Reset information so that the "from Teacher
				quiz ID" or from Teacher quiz name" is not populated or 
				that the server does not think every time the user is redirected 
				from the teacherQuiz page each time user visits the 
				teacherScoreboard page. */
				req.session.fromTeacherQuizPage = false;
				req.session.fromTeacherQuizID = "";
				req.session.fromTeacherQuizName = "";
				req.session.fromTeacherHomeID = "";
			}

			// ELSE IF this route originated from teacherScoreboard page...
			// else // if (req.session.fromTeacherScoreboardPage == true)
			// {
			// 	// console.log("I am inside fromTeacherScoreboardPage in the GET route!");
				
			// 	context.fromTeacherScoreboardPage = req.session.fromTeacherScoreboardPage;
			// 	context.radioName = req.session.radioName;
			// 	context.quizButton = req.session.quizButton;
			// 	context.studentButton = req.session.studentButton;
			// 	context.sortStudentButton = req.session.sortStudentButton;
			// 	context.sortQuizButton = req.session.sortQuizButton;
			// }

			var mysql = req.app.get('mysql');
			getQuizDrop(res, mysql, teacherID, context, complete);
			getStudentDrop(res, mysql, teacherID, context, complete);
			getQuizScores(res, mysql, teacherID, context, complete);
			getStudentScores(res, mysql, teacherID, context, complete);

			function complete() {
				callbackCount++;
				if (callbackCount >= 4) {
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
	
	// to delete student from quiz
	router.delete('/:qid/:sid', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student_question WHERE quizID = ? AND studentID = ?";
        var inserts = [req.params.qid, req.params.sid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
	})
	
	// Execute route to teacherScoreboard page based on POST method...
	router.post("/", function(req, res)
	{
		// TEST: Output request sent from the client.
		// console.log(req.body);
		
		// // IF post request originated from teacherScoreboard page...
		// if (req.body.fromTeacherScoreboardPage == true)
		// {
		// 	// TEST: Output to console that program is inside fromTeacherScoreboard branch.
		// 	// console.log("I am inside fromTeacherScoreboard branch!");

		// 	// Store or update the following data in session.
		// 	req.session.fromTeacherQuizPage = false;
		// 	req.session.fromTeacherScoreboardPage = req.body.fromTeacherScoreboardPage;
		// 	req.session.radioName = req.body.radioName;
		// 	req.session.quizButton = req.body.quizButton;
		// 	req.session.studentButton = req.body.studentButton;
		// 	req.session.sortStudentButton = req.body.sortStudentButton;
		// 	req.session.sortQuizButton = req.body.sortQuizButton;

		// 	// TEST: Output to console the updated sessions data.
		// 	// console.log(req.session);

		// 	// Save the session data.
		// 	req.session.save();
		// }
		
		// // ELSE, post request originated from teacherQuiz page...
		// else
		// {
			// Store or update the following data in session.
			req.session.fromTeacherScoreboardPage = false;
			req.session.fromTeacherQuizPage = true;
			req.session.fromTeacherQuizID = req.body.fromTeacherQuizID;
			req.session.fromTeacherQuizName = req.body.fromTeacherQuizName;

			req.session.fromTeacherHomeID = req.body.fromTeacherHomeID;
			// console.log(req.session);
			
			// Send status 200 to the client.
			res.status(200);
			
			// Forcefully end the response process.
			res.end();
		// }

	});
	
	return router;
}();