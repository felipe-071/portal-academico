const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const passport = require('passport');
const session = require('express-session');
require('./auth')(passport);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/loginRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//inicio authentication
app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 * 60 * 1000} // 2 minutos
  }));
  
  // fim
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)

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
