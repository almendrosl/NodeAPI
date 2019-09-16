var unirest = require('unirest');

exports.getWeather = () => {
  var req = unirest(
    'GET',
    'https://community-open-weather-map.p.rapidapi.com/weather'
  );

  req.query({
    q: 'Cordoba, Cordoba, Argentina',
    lang: 'sp',
    units: 'metric'
  });

  req.headers({
    'x-rapidapi-key': 'd7967ad6b3mshb060a5364dc17c8p1f5276jsn65436b038c10',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  });

  req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });
};
