const unirest = require('unirest');

exports.getWeather = (city = 'Cordoba, Cordoba, Argentina', cb) => {
  var req = unirest(
    'GET',
    'https://community-open-weather-map.p.rapidapi.com/weather'
  );

  req.query({
    q: city,
    lang: 'sp',
    units: 'metric'
  });

  req.headers({
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  });

  req.end(function(res) {
    if (res.error) return cb(res);
    cb(null, res.body);
  });
};
