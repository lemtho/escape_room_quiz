module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get('/', function(req,res){
		var context = {};
		var mysql = req.app.get('mysql');
		
		mysql.pool.query('SELECT * FROM student', function(error, rows, fields)
		{
			if(error)
			{
				res.write(JSON.stringify(error));
                res.end();
			}
			
			context.results = JSON.stringify(rows);
			res.render("testDatabase", context);
		});
	});
	
	return router;
}();