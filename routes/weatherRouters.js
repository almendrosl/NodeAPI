const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const auth = require('../middleware/auth');

/* GET weather . */
router.get('/', auth, weatherController.weather);

router.get('/weatherFromUser/:id', auth, weatherController.weatherFromUser);

module.exports = router;
