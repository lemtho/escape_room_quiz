module.exports = function()
{
	var express = require('express');
    var router = express.Router();
    var moment = require('moment');
    var session = require('express-session');
	
	// Function to pull all quizzes under a teacher
	function getQuiz(res, mysql, context, id, complete){
        mysql.pool.query("UPDATE quiz SET numQUESTION = (SELECT COUNT(quizID) FROM question WHERE question.quizID = quiz.quizID)");
        var sql = 'SELECT q.quizID AS id, q.name AS name, IFNULL(q.numQuestion, 0) AS numQuestion, IFNULL(num_taken, 0) AS num_taken FROM quiz AS q LEFT JOIN (SELECT quizID, count(distinct quizID, studentID) AS num_taken FROM student_question GROUP BY quizID) stu_num USING (quizID) WHERE teacherID = ?';
        var insert = [id];
        sql = mysql.pool.query(sql, insert, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }

            context.quiz = results; 
            complete(); 
        });
	}

	 // Function to get id of a quiz
	 function getQuizID(res, mysql, context, name, teacherID, complete){
        var sql = "SELECT quizID FROM quiz WHERE name = ? and teacherID = ?";
        var inserts = [name, teacherID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            context.quizID = results[0].quizID;
            complete();
        });
	}
    
    // Function to pull all questions from a quiz; used to load editQuiz page
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

	// Display all quizzes that the teacher has created 
	router.get("/", function(req, res){
        if(req.session.teacherID)
        {
            var teacherID = req.session.teacherID;
            var callbackCount = 0; 
            var context = {};
            var mysql = req.app.get('mysql');
            getQuiz(res, mysql, context, teacherID, complete);
            
            function complete(){
                callbackCount++;
                context.title = "My Quizzes";
                if(callbackCount >= 1){
                    res.render('teacherQuiz', context);
                }
            }
        }
        else{
            res.redirect("/");
        }

	});

    // Renders create quiz page
    router.get("/createQuiz", function(req, res){
        if(req.session.teacherID)
        {
            res.render('createQuiz', {title: "Create New Quiz"});
        }
        else{
            res.redirect("/");
        }
    });
    
    
    // Renders edit quiz page to update quiz information 
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

    // Create new quiz, get quiz name and redirect to add question page
	router.post("/Quiz", function(req, res){
        var teacherID = req.session.teacherID;
		var mysql = req.app.get('mysql');
        var sql = 'INSERT INTO quiz (name, teacherID, dateCreated) VALUES (?,?,?)';

        //Get current time; referenced: https://stackoverflow.com/questions/23977548/using-node-js-express-and-mysql-to-insert-for-a-timestamp
        var curTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        var inserts = [req.body.quizName, teacherID, curTime];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
			}
			else{
                var context = {};
                var callbackCount = 0;
                getQuizID(res, mysql, context, req.body.quizName, teacherID, complete);
                function complete(){
                    callbackCount++;
                    if(callbackCount >= 1){
                        quizID = context.quizID;
                        res.redirect('/teacherQuiz/' + quizID);
                    }
                }
            }  
		});
    });
    
    // Insert new question into quiz and reload page
    router.post("/Quiz/:id", function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'INSERT into question (question, type, answer, quizID, choiceA, choiceB, choiceC) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        //check type and determine inserts
        if(req.body.newType == 'SA'){
            var inserts = [req.body.newWording, req.body.newType, req.body.SAAnswer, req.params.id, null, null, null];
        }
        else if(req.body.newType == 'TF'){
            var inserts = [req.body.newWording, req.body.newType, req.body.TFAnswer, req.params.id, req.body.TFChoiceA, null, null];
        }
        else{
            var inserts = [req.body.newWording, req.body.newType, req.body.MCAnswer, req.params.id, req.body.MCChoiceA, req.body.MCChoiceB, req.body.MCChoiceC];
        }

        sql = mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            else{
                res.status(202);
                res.end();
            }
        });
        
    });

    // Update question in quiz and reloads page
    router.put("/Quiz/:id", function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body.type);

    
        //Determine update content depending on question type
        if(req.body.type == 'SA')
        {
            var sql = 'UPDATE question SET question = ?, answer = ? WHERE questionID = ?';
            var inserts = [req.body.question, req.body.answer, req.params.id];
        }
        else if(req.body.type == 'TF')
        {
            var sql = 'UPDATE question SET question = ?, answer = ?, choiceA = ? WHERE questionID = ?';
            var inserts = [req.body.question, req.body.answer, req.body.choiceA, req.params.id];
        }
        else if(req.body.type == 'MC')
        {
            var sql = 'UPDATE question SET question = ?, answer = ?, choiceA = ?, choiceB = ?, choiceC = ? WHERE questionID = ?';
            var inserts = [req.body.question, req.body.answer, req.body.choiceA, req.body.choiceB, req.body.choiceC, req.params.id];
        }

        mysql = mysql.pool.query(sql, inserts, function(error, results){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            else{
                res.status(202);
                res.end();
            }
        });
    });

    // Delete quiz from quiz list
    router.delete("/:id", function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'DELETE FROM quiz WHERE quizID = ?';
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            else{
                res.status(204).end(); 
            }
        });
    });

    // Delete question from quiz
    router.delete("/Quiz/:id", function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'DELETE FROM question WHERE questionID = ?';
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end(); 
            }
            else{
                res.status(204).end(); 
            }
        });
    });
    
	return router;
}();