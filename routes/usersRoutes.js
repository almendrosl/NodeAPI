const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getOneUser);

/* POST user, save in db. */
router.post('/', userController.add);

router.delete('/:id', userController.delete);

router.put('/:id', userController.updateUser);

router.put('/saveCity/:id', userController.setUserCity);

module.exports = router;
