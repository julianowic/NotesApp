const mongoose = require("mongoose");

const Schema = mongoose.Schema

const categorySchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref : 'user',
    },
    category:{
        type: String,
        required: true,
        trim: true,
        minlenght: 1
    }
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category