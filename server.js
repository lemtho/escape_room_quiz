// Import modules and initialize.
var express = require("express");
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Create the express application.
var app = express();

// Set the engine used to render the (front-end) web pages.
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set the port. Have Heroku select port or use port 22580.
var port = process.env.PORT || 22580

/* ESTABLISH ROUTES AND THE JS FILE THE ENGINE SHOULD USE WHEN PROCESSING THE ROUTE. */

/* IF route to home page, execute homePage.js script. Additionally, for this and the
following routes listed below grab static images, CSS scripts, and/or front-end JS scripts 
from the "public" folder. */
app.use("/", express.static("public"));
app.use("/", require("./homePage.js"));

// IF route to student home page, execute studentHomePage.js script.
app.use("/studentHomePage", express.static("public"));
app.use("/studentHomePage", require("./studentHomePage.js"));

// IF route to student scoreboard page, execute studentScoreboard.js script.
app.use("/studentScoreboard", express.static("public"));
app.use("/studentScoreboard", require("./studentScoreboard.js"));

// IF route to student profile, execute studentProfile.js script.
app.use("/studentProfile", express.static("public"));
app.use("/studentProfile", require("./studentProfile.js"));

// IF route to teacher home page, execute teacherHomePage.js script.
app.use("/teacherHomePage", express.static("public"));
app.use("/teacherHomePage", require("./teacherHomePage.js"));

// IF route to teacher quiz page, execute teacherQuiz.js script.
app.use("/teacherQuiz", express.static("public"));
app.use("/teacherQuiz", require("./teacherQuiz.js"));

// IF route to teacher student page, execute teacherStudent.js script.
app.use("/teacherStudents", express.static("public"));
app.use("/teacherStudents", require("./teacherStudents.js"));

// IF route to teacher scoreboard, execute teacherScoreboard.js script.
app.use("/teacherScoreboard", express.static("public"));
app.use("/teacherScoreboard", require("./teacherScoreboard.js"));

// IF route to teacher profile page, execute teacherProfile.js script.
app.use("/teacherProfile", express.static("public"));
app.use("/teacherProfile", require("./teacherProfile.js"));

// IF route to a page that is not found, render a HTTP 404 response.
app.use(function(req, res)
{
    res.status(404);
    res.render("pageNotFound");
});
  
// IF internal server error occurs when processing a route, render a HTTP 500 response.  
app.use(function(err, req, res, next)
{
    console.error(err.stack);
    res.status(500);
    res.render("serverError");
});

// Have the app (i.e., server) output message notifying user it is listening for HTTP requests on the port.
app.listen(port, function()
{
    console.log("Express is running on port " + port + ". Press Ctrl+C to terminate the session.\n");
});