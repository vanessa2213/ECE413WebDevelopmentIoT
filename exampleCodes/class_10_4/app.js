const port = 3000;
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Static file hosting
app.use(express.static(path.join(__dirname, 'public')));

// load the router module in the app
let usersRouter = require('./routes/users');
// call your routers
app.use('/users', usersRouter);



app.listen(port, function() {
    console.log(`app listening at http://localhost:${port}`);
});

app.use(function(req, res, next) {
    //Catch 404 error and return an error message
    console.log("404 error");
    res.status(404);
    res.send("404- Not found (The resource could not be located)");
});

app.use(function(err, req, res, next) {
    //Catch 500 error and return an error message
    console.log("500 error");
    res.status(500);
    res.send("500-Internal server error");
});