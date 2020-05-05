module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get('/', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		
		mysql.pool.query('SELECT name, quizID AS age FROM quiz WHERE quizID = 1', function(error, rows, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
                res.end();
			}
			
			context.quiz = rows;
			res.render("testGame", context);
		});
	});

	router.post("/update", function(req, res){

		console.log(req.body);

		// Create additional commands to handle req.body.
	});
	
	return router;
}();