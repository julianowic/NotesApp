const mongoose = require("mongoose");

const Schema = mongoose.Schema

const categorySchema = new Schema({
    category:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlenght: 1
    }
}, {
    timestamps: true,
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category