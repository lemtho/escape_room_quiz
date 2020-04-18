module.exports = function()
{
	var express = require('express');
    var router = express.Router();
	
	router.get("/", function(req, res){
		res.render("homePage", {title: "2Kool4Skool"});
	});
	
	return router;
}();