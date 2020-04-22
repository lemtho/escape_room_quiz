module.exports = function()
{
	var express = require('express');
	var router = express.Router();

	// FOR NOW USING HARD CODED SESSION ID AS STUDENT ID
	var sessionID = '1';
	
	function getStudentName(res, mysql, id, context, complete){
		var sql = "SELECT * FROM student WHERE studentID = ?";
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
	
	router.get("/", function(req, res){
		var callbackCount = 0; 
		var context = {};
		var mysql = req.app.get('mysql');
		getStudentName(res, mysql, sessionID, context, complete);
	
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				context.title = 'Student Profile Page';
				res.render('studentProfile', context);
			}
		}
	});

	// update student name
    router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'UPDATE student SET firstName = ?, lastName = ? WHERE studentID = ?';
		var inserts = [req.body.newFirstName, req.body.newLastName, sessionID];

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
	});
	
	// update student password
	router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'UPDATE student SET password = ? WHERE studentID = ?';
		var inserts = [req.body.newPassword, sessionID];

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
    });
	
	return router;
}();