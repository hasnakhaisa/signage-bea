var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
var cons = require('consolidate');

// Database
var monk = require('monk');
// var db = monk('localhost:27017/bea-cukai');
var db = monk('mongodb://beacukai:telukb4yur@ds137263.mlab.com:37263/heroku_ndqs94pw');
var app = express();

app.use(function(req,res,next){
    req.db = db;
    next();
});

var indexRouter = require('./routes/index');
var inboxRouter = require('./routes/inbox');
var outboxRouter = require('./routes/outbox');
var textRouter = require('./routes/text');
var infoRouter = require('./routes/info');
var photosRouter = require('./routes/photos');
let photo_url;

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inbox', inboxRouter);
app.use('/outbox', outboxRouter);
app.use('/text', textRouter);
app.use('/info', infoRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
