var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: Date.now
    },
});

UserSchema.method.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);