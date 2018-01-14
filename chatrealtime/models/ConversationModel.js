var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatrealtime');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

var User = mongoose.model('Conversation', ConversationSchema, 'conversation');

module.exports = User;
