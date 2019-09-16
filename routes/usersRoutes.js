var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.get('/', userController.getAllUsers);
/* POST user, save in db. */
router.post('/', userController.add);

router.put('/saveCity/:id', userController.setUserCity);

module.exports = router;
