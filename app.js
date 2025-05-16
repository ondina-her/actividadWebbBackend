var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var usersGoals = require('./routes/goals');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*router.use((req, res, next) => {
  if(req.headers.authorization && req.headers.authorization === '123456') {
    next();
  }
  else {
    res.json({'error': 'Unauthorized'});
  }
  
}
);

*/
app.use((req, res, next) => {
  if (req.headers.authorization === '123456') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals', usersGoals);



app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  console.error("ERROR:", err);
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
