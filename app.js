if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const weatherRouter = require('./routes/weather');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);

app.use(function(err, req, res, next) {
  if (err.status === 404) {
    return res.status(404).send(JSON.parse(err.raw_body));
  }
  next(err);
});

module.exports = app;
