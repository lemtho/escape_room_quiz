module.exports = function()
{
	var express = require('express');
	var router = express.Router();
	var sessionID = '3';
	
	// still need to get specific teacher id
	function getTeacherName(res, mysql, id, context, complete){
		var sql = "SELECT * FROM teacher WHERE teacherID = ?";
		var inserts = [id]
		mysql.pool.query(sql, inserts, function(error, results, fields){
			if(error){
				console.log(error);
				res.write(JSON.stringify(error));
				res.end();
			}
	
			context.teacher = results; 
			complete(); 
		});
	}
	
	router.get("/", function(req, res){
		var callbackCount = 0; 
		var context = {};
		var mysql = req.app.get('mysql');
		getTeacherName(res, mysql, sessionID, context, complete);
	
		function complete(){
			callbackCount++;
			if(callbackCount >= 1){
				context.title = 'Teacher Profile Page';
				res.render('teacherProfile', context);
			}
		}
	});

	// update teacher name
    router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'UPDATE teacher SET firstName = ?, lastName = ? WHERE teacherID = ?';
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
	
	// update teacher password
	router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = 'UPDATE teacher SET password = ? WHERE teacherID = ?';
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