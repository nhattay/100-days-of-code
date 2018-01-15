var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Conversation = require('../models/ConversationModel');
var Message = require('../models/MessageModel');

exports.createNew = function(req, res, next) {
    if(!req.body.recipient) {
        res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
        return next();
    }

    if(!req.body.composedMessage) {
        res.status(422).send({ error: 'Please enter a message.' });
        return next();
    }

    const conversation = new Conversation({
        participants: [req.user._id, req.body.recipient]
    });

    conversation.save(function(err, newConversation) {
        if (err) {
            res.send({ error: err });
            return next(err);
        }

        const message = new Message({
            conversationId: newConversation._id,
            body: req.body.composedMessage,
            user: req.user._id
        });

        message.save(function(err, newMessage) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json(conversation);
            return next();
        });
    });
}