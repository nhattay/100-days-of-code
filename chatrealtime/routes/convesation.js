var express = require('express');
var router = express.Router();
var ConvesationController = require('../controllers/ConversationController');

router.post('/create', ConvesationController.createNew);
router.get('/list', ConvesationController.getConversations);

module.exports = router;
