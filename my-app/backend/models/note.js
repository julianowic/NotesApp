const mongoose = require("mongoose");

const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {type : String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note