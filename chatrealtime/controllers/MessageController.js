var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Message = require('../models/MessageModel');

exports.create = function(req, res, next) {
    var response = {
        code: 200,
        message: '',
        data: null
    };

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

        response.data = newMessage;
        return res.status(200).json(response);
    });
};