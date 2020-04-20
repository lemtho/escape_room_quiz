module.exports = function()
{
	var express = require('express');
	var router = express.Router();

	//Need to change student ID to be a passed in value
	function getStudentQuizScore(res, mysql, context, complete){
		mysql.pool.query("SELECT q.name, actual_score FROM quiz AS q LEFT JOIN(SELECT studentID,quizID, SUM(questionPT) AS actual_score FROM student_question GROUP BY studentID, quizID) stu_quiz USING (quizID) WHERE stu_quiz.studentID = 1;", function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }

            context.student = results; 
            complete(); 
        });
	}
	
	//Display all the student's quizzes and scores
	router.get("/", function(req, res){
		var callbackCount = 0; 
        var context = {};
        var mysql = req.app.get('mysql');
        getStudentQuizScore(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('studentScoreboard', context);
            }
        }

	});
	
	return router;
}();