const {Schema,model} = require('mongoose');

const authSchema = new Schema({
    login:{
        type: String,
        unique:true,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
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
            'manager'
        ]
    }
},{timestamps:true});

module.exports = model('auth',authSchema);