const weather = require('../app/weather');

exports.weather = (req, res, next) => {
  const city = req.query.city;
  weather.getWeather(city, (err, weatherRes) => {
    if (err) return next(err);
    res.send(weatherRes);
  });
};
