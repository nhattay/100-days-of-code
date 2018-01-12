var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

/* GET users listing. */
router.post('/register', UserController.register);
router.post('/signin', UserController.signin);

module.exports = router;
