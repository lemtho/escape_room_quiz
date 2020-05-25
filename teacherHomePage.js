module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	
	function getRecentQuizScores(res, mysql, id, context, complete) {
		var sql = "SELECT s.studentID, s.firstName, s.lastName, q.quizID, q.name, DATE_FORMAT(dateTaken, '%m/%d/%Y') AS lastTakenDate FROM teacher AS t LEFT JOIN quiz AS q ON t.teacherID = q.teacherID JOIN (SELECT studentID, quizID, dateTaken FROM student_question GROUP BY dateTaken, studentID, quizID) sq USING (quizID) JOIN student AS s ON sq.studentID = s.studentID WHERE t.teacherID = ? ORDER BY lastTakenDate DESC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.students = results;
			complete();
		});
	}

	function getRecentlyCreatedQuizzes(res, mysql, id, context, complete) {
		var sql = "SELECT name AS quizName, DATE_FORMAT(dateCreated, '%m/%d/%Y') AS dateCreated FROM quiz WHERE teacherID = ? ORDER BY dateCreated DESC;";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields) {
			if (error) {
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}

			context.quizzes = results;
			complete();
		});
	}
	
	router.get("/", function(req, res){
		
		// TEST: Output request data.
		// console.log(req.session);
		
		// IF user is already signed in (i.e., req.session.studentID exists)...
		if (req.session.teacherID)
		{
			var teacherID = req.session.teacherID;
			var firstName = req.session.firstName;
			var callbackCount = 0;
			var context = {};
			var mysql = req.app.get('mysql');
			getRecentQuizScores(res, mysql, teacherID, context, complete);
			getRecentlyCreatedQuizzes(res, mysql, teacherID, context, complete);

			function complete() {
				callbackCount++;
				if (callbackCount >= 2) {
					context.title = "Teacher Home Page";
					context.user = firstName;
					res.render('teacherHomePage', context);
				}
			}
		}

		// ELSE user is not signed in...
		else
		{
			// Redirect user to home page.
			res.redirect("/");
		}
	});
	
	return router;

}();