var express = require('express');
var router = express.Router();
const weatherController = require('../controllers/weatherController');

/* GET weather . */
router.get('/', weatherController.weather);

router.get('/weatherFromUser/:id', weatherController.weatherFromUser);

module.exports = router;
