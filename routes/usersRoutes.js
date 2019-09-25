const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/* GET users listing. */
router.get('/', auth, admin, userController.getAllUsers);

router.get('/current', auth, userController.getCurrent);

router.get('/logout', userController.logout);

router.get('/:id', auth, userController.getOneUser);

/* POST user, save in db. */
router.post('/', userController.add);

router.delete('/:id', auth, admin, userController.delete);

router.put('/:id', auth, userController.updateUser);

router.put('/saveCity/:id', auth, userController.setUserCity);

router.post('/login', userController.login);


module.exports = router;
