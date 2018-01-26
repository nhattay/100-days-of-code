var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Conversation = require('../models/ConversationModel');
var Message = require('../models/MessageModel');

exports.createNew = function (req, res, next) {
  var response = {
    code: 200,
    message: '',
    data: null
  };
  if (!req.body.recipient) {
    response.message = 'Please choose a valid recipient for your message.';
    return res.status(422).json(response);
  }

  if (!req.body.composedMessage) {
    response.message = 'Please enter a message.';
    return res.status(422).json(response);
  }

  const conversation = new Conversation({
    participants: [req.user._id, req.body.recipient]
  });

  conversation.save(function (err, newConversation) {
    if (err) {
      res.send({error: err});
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: req.body.composedMessage,
      user: req.user._id
    });

    message.save(function (err, newMessage) {
      if (err) {
        res.send({error: err});
        return next(err);
      }

      response.data = conversation;
      return res.status(200).json(response);
    });
  });
};

exports.getConversations = function (req, res, next) {
  var response = {
    code: 200,
    message: '',
    data: null
  };
  console.log(req.user);

  Conversation.find({participants: req.user._id})
    .select('_id')
    .exec(function (err, conversations) {
      if (err) {
        res.send({error: err});
        return next(err);
      }

      var fullConversations = [];
      conversations.forEach(function (conversation) {
        Message.findOne({'conversationId': conversation._id})
          .sort('-createdAt')
          .populate({
            path: "user",
            select: "username email"
          })
          .exec(function (err, message) {
            if (err) {
              res.send({error: err});
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              response.data = fullConversations;
              return res.status(200).json(response);
            }
          });
      });
    });
};