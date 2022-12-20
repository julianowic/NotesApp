const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required : [true, 'Please add a name']
    },
    email: {
        type: String,
        required : [true, 'Please add an email address'],
        unique: true
    },
    password: {
        type: String,
        required : [true, 'Please add a password'],
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)

module.exports = User




