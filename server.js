// Import modules and initialize.
var express = require("express");
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Create the express application.
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set the port. Have Heroku select port or use port 22580.
var port = process.env.PORT || 22580

/* ESTABLISH ROUTES AND THE JS FILE THE ENGINE SHOULD USE WHEN PROCESSING THE ROUTE. */

// IF route to home page, run command in homePage.js
app.use("/", express.static('public'));
app.use("/", require('./homePage.js'));

// IF route to student home page, run command in studentHomePage.js
app.use("/studentHomePage", express.static('public'));
app.use("/studentHomePage", require('./studentHomePage.js'));

// IF route to student scoreboard page, run command in studentScoreboard.js
app.use("/studentScoreboard", express.static('public'));
app.use("/studentScoreboard", require('./studentScoreboard.js'));

// IF route to student profile, run commands in studentProfile.js
app.use("/studentProfile", express.static('public'));
app.use("/studentProfile", require('./studentProfile.js'));

// IF route to teacher home page, run command in teacherHomePage.js
app.use("/teacherHomePage", express.static('public'));
app.use("/teacherHomePage", require('./teacherHomePage.js'));

// IF route to teacher quiz page, execute teacherQuiz.js script.
app.use("/teacherQuiz", express.static('public'));
app.use("/teacherQuiz", require('./teacherQuiz.js'));

// IF route to teacher student page, execute teacherStudent.js script.
app.use("/teacherStudents", express.static('public'));
app.use("/teacherStudents", require('./teacherStudents.js'));

// IF route to teacher scoreboard, execute teacherScoreboard.js script.
app.use("/teacherScoreboard", express.static('public'));
app.use("/teacherScoreboard", require('./teacherScoreboard.js'));

// IF route to teacher profile page, execute teacherProfile.js script.
app.use("/teacherProfile", express.static('public'));
app.use("/teacherProfile", require('./teacherProfile.js'));

// IF route to a page that is not found, render a HTTP 404 response.
app.use(function(req,res)
{
    res.status(404);
    res.render('404');
});
  
// IF internal server error occurs when processing a route, render a HTTP 500 response.  
app.use(function(err, req, res, next)
{
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, function()
{
    console.log("Express is running on port " + port + ". Press Ctrl + C to terminate.\n");
});