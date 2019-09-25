if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/indexRoutes');
const usersRouter = require('./routes/usersRoutes');
const weatherRouter = require('./routes/weatherRouters');

const app = express();
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);

// Not found middleware
app.use((req, res, next) => {
  return next({ status: 404, message: 'not found' });
});

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else if (err.name === 'MongoError' && err.code === 11000) {
    errCode = 400;
    errMessage = err.message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage =
      err.message || JSON.parse(err.raw_body) || 'Internal Server Error';
  }
  res.status(errCode).send(errMessage);
});

module.exports = app;
