var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
// var db = require('../models/db');
var User = require('../models/UserModel');

// var User = mongoose.model('User');

exports.register = function(req, res) {
    var newUser = new User(req.body);

    var salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(req.body.password, salt);

    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.password = '';
            return res.json(user);
        }
    });
};

exports.signin = function(req, res) {
    console.log(req.body.email);
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.checkPassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({
                    token: jwt.sign({ email: user.email, username: user.username, _id: user._id}, 'RESTFULAPIs'),
                    email: user.email,
                    username: user.username
                });
            }
        }
    });
};

exports.profile = function(req, res) {
    return res.json(req.user);
};

exports.checkLogin = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};