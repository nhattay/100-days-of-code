var express = require('express');
var router = express.Router();
var ConvesationController = require('../controllers/ConversationController');

router.post('/createNew', ConvesationController.createNew);
// router.post('/signin', UserController.signin);
// router.get('/profile', UserController.checkLogin, UserController.profile);

module.exports = router;
