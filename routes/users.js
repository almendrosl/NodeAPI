var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with all users');
});
/* POST user, save in db. */
router.post('/', userController.add);

module.exports = router;
