var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');

var app = express();
//const port = 3000;

//Ensure that app is working
//app.listen(port,()=> console.log('App listening on port ' + port));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// This is to enable cross-origin access
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var powerRouter = require('./routes/power');
var refRouter = require('./routes/references');
var liveRouter = require('./routes/live');
var loginRouter = require('./routes/login');
var particleRouter = require('./routes/particle');
var settingsRouter = require('./routes/settings');

//Endpoints
//app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/aboutUs', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/power', powerRouter);
app.use('/references', refRouter);
app.use('/live', liveRouter);
app.use('/data', particleRouter);
app.use('/settings', settingsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
