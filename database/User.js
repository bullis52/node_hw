const {Schema, model} = require('mongoose');

const userRoles = require('../config/user.roles');

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
