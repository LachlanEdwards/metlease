var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var sequelize = require('./orm/sequelize');
var cloudinary = require('cloudinary').v2;
var cors = require('cors');

cloudinary.config({
  cloud_name: 'metlease',
  api_key: '728113461321164',
  api_secret: 'd8KyV7w65WNryfN-6BrNBYJzHgo'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var buildingsRouter = require('./routes/buildings');
var mediaRouter = require('./routes/media');
var apartmentsRouter = require('./routes/apartments');
var reviewsRouter = require('./routes/reviews');
var searchRouter = require('./routes/search');
var suburbsRouter = require('./routes/suburbs');


var app = express();
var application_secret = "w0M0rMEPnEoJwXUvJr4eM9OYce70kGPa0hAovzFR2FAkGqtu4tsYtlChiMFiaw2GFQfkOemXeR3oCXcPiS8acTtWfoiVrX5d4a4o3sWZbIwZxkiyE89z1TE63TDt2tykctMk8ECe75b6";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  key: 'session_id',
  secret: application_secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication', authRouter);
app.use('/buildings', buildingsRouter);
app.use('/media', mediaRouter);
app.use('/apartments', apartmentsRouter);
app.use('/reviews', reviewsRouter);
app.use('/search', searchRouter);
app.use('/suburbs', suburbsRouter);

app.use((req, res, next) => {
  if (req.cookies.session_id && !req.session.user) {
    res.clearCookie('session_id');
  }
  next();
});

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
