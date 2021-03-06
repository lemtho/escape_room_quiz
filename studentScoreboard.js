module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	var session = require('express-session');

	function getStudentQuizScore(res, mysql, id, context, complete){
        var sql = "SELECT studentID, q.quizID, q.name, actual_score FROM quiz AS q LEFT JOIN(SELECT studentID,quizID, SUM(questionPT) AS actual_score FROM student_question GROUP BY studentID, quizID) stu_quiz USING (quizID) WHERE stu_quiz.studentID = ?;";
        var inserts = [id];
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
		var sql = "SELECT DISTINCT s.firstName, s.lastName, q.name, DATE_FORMAT(dateTaken, '%m/%d/%Y') AS lastTakenDate FROM student AS s LEFT JOIN (SELECT questionID, studentID, dateTaken FROM student_question WHERE quizID = ?) sq USING (studentID) JOIN question AS quest ON sq.questionID = quest.questionID JOIN quiz AS q ON quest.quizID = q.quizID WHERE studentID = ?;";
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
	
	//Display all the student's quizzes and scores
	router.get("/", function(req, res){
		if (req.session.studentID) {
			var studentID = req.session.studentID;
			var callbackCount = 0; 
			var context = {};
			var mysql = req.app.get('mysql');
			getStudentQuizScore(res, mysql, studentID, context, complete);

			function complete(){
				callbackCount++;
				if(callbackCount >= 1){
					context.title = 'Scoreboard';
					res.render('studentScoreboard', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
    });
    
    	// to view student results
	router.get('/:qid/:sid', function(req, res){
		if (req.session.studentID) {
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
					res.render('studentResults', context);
				}
			}
		}
		else {
			res.redirect("/");
		}
    });
	
	return router;
}();