var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatrealtime');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
        conversationId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    });

var Message = mongoose.model('Message', MessageSchema, 'message');

module.exports = Message;
