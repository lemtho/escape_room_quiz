// Import modules and initialize.
var express = require("express");

// Create the express application.
var app = express();

// Set the port. Have Heroku select port or use port 22580.
var port = process.env.PORT || 22580

// When request to app is received to also allow server to serve static files, such as
// HTML, CSS, and front-end JS files.
app.use(express.static(__dirname + "/public"));

/* ESTABLISH ROUTES. */

// TEST: Render static index.html file when user wants to access the home page.
app.get("/", function(req, res) {
    res.render("homePage");
});

app.listen(port, function()
{
    console.log("Express is running on port " + port + ".\n");
});