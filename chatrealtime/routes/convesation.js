var express = require('express');
var router = express.Router();
var ConvesationController = require('../controllers/ConversationController');

router.post('/createNew', ConvesationController.createNew);
router.get('/getConversations', ConvesationController.getConversations);

module.exports = router;
