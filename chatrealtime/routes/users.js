var express = require('express');
var router = express.Router();
var UerrController = require('../controllers/userController');

/* GET users listing. */
router.post('/register', UerrController.register);
// router.get('/test', UerrController.test);
module.exports = router;
