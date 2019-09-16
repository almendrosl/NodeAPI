var express = require('express');
var router = express.Router();
const weather = require('../app/weather');

/* GET weather . */
router.get('/', function(req, res, next) {
  weather.getWeather();
  res.send('respond with from weather');
});

module.exports = router;
