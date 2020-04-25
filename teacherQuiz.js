module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	//Need to change teacher ID to be a passed in value
	function getQuiz(res, mysql, context, complete){
		mysql.pool.query("SELECT q.quizID AS id, q.name AS name, IFNULL(q.numQuestion, 0) AS numQuestion, IFNULL(num_taken, 0) AS num_taken FROM quiz AS q LEFT JOIN (SELECT quizID, count(distinct quizID, studentID) AS num_taken FROM student_question GROUP BY quizID) stu_num USING (quizID) WHERE teacherID = 4", function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }

            context.quiz = results; 
            complete(); 
        });
	}

	 /* function to get id of a quiz */
	 function getQuizID(res, mysql, context, name, teacherID){
        var sql = "SELECT quizID FROM quiz WHERE name = ? and teacherID = ?";
        var inserts = [name, teacherID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            
            context.id = results[0];
            return context.id; 
        });
	}
    
    function getQuestions(res, mysql, context, quizID, complete){
        var sql = "SELECT * FROM question WHERE quizID = ?";
        var inserts = [quizID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            
            context.question = results;
            context.quizID = quizID; 
            complete(); 
        })
    }
	//Display all quizzes that the teacher has created 
	router.get("/", function(req, res){
		var callbackCount = 0; 
        var context = {};
        var mysql = req.app.get('mysql');
        getQuiz(res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            context.title = "My Quizzes";
            if(callbackCount >= 1){
                res.render('teacherQuiz', context);
            }
        }

	});

    router.get("/createQuiz", function(req, res){

        res.render('createQuiz', {title: "Create New Quiz"});

    });
    
    
    //renders edit quiz page to update quiz information 
    router.get('/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["editQuizPage.js"];
        var mysql = req.app.get('mysql');
        getQuestions(res, mysql, context, req.params.id, complete); 

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('editQuiz', context);
            }
        }
    });
    

	

	//Need to have teacher ID 
	router.post("/", function(req, res){
		var mysql = req.app.get('mysql');
        var sql = 'INSERT INTO quiz (name, teacherID) VALUES (?,?)';
        var inserts = [req.body.name, 3];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
			}
			else{
				var context = {};
				var id = getQuizID(res, mysql, context, req.body.name, 3);
                res.redirect('createQuiz');
            }  
		});
	});

    //Delete quiz 
    router.delete("/:id", function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'DELETE FROM quiz WHERE quizID = ?';
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(KSON.stringify(error));
                res.end(); 
            }
            else{
                res.status(202).end(); 
            }
        });
    });

    //Insert new question into quiz
    router.post("/question", function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'INSERT into question (question, type, answer, quizID, choiceA, choiceB, choiceC) VALUES (?, ?, ?, ?, ?, ?, ?)';
        //check type and determine inserts
        var inserts = [req.body.wording, req.body.newType, req.body.answer, req.body.quizID, choiceA];
    });
    
	return router;
}();