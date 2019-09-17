const weather = require('../app/weather');
const user = require('../models/userModel');

exports.weather = (req, res, next) => {
  const city = req.query.city;
  weather.getWeather(city, (err, weatherRes) => {
    if (err) return next(err);
    res.send(weatherRes);
  });
};

exports.weatherFromUser = (req, res, next) => {
  const id = req.user._id;
  user.findById(id, 'favouriteCity', (err, queryRes) => {
    if (err) return next(err);
    const city = queryRes.favouriteCity;
    weather.getWeather(city, (err, weatherRes) => {
      if (err) return next(err);
      res.send(weatherRes);
    });
  });
};
