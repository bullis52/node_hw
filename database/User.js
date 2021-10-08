const {Schema, model} = require('mongoose');

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
        minLength: 6,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: 'user',
        enum: [
            'user',
            'admin',
            'managers'
        ]
    }
}, {timestamps: true});

module.exports = model('user', userSchema);
