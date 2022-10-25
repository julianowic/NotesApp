const mongoose = require("mongoose");

const Schema = mongoose.Schema

const noteSchema = new Schema({
    category: {type: String, required: true},
    title: {type : String, required: true},
    content: {type: String, required: true},
}, {
    timestamps: true,
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note