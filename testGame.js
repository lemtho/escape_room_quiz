module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get('/', function(req, res){
		var context = {};
		var mysql = req.app.get('mysql');
		
		mysql.pool.query("SELECT question, type from question WHERE quizID = 4", function(error, results, fields)
		{
			if (error)
			{
				res.write(JSON.stringify(error));
                res.end();
			}
			
			// Convert JSON object to JSON string and store inside context object.
			context.JSONString = JSON.stringify(results);

			res.render("testGame", context);
		});
	});

	router.post("/update", function(req, res){

		console.log(req.body);

		// Create additional commands to handle req.body.
	});
	
	return router;
}();