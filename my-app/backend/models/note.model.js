const mongoose = require("mongoose");

const Schema = mongoose.Schema

const noteSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref : 'user',
    },
    category: {type: String, required: false},
    title: {type : String, required: true},
    content: {type: String, required: true},
}, {
    timestamps: true,
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note