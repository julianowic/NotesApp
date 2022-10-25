const router = require('express').Router()
let Note = require('../models/note.model')

router.route('/').get((req, res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(err).json('Error: ' + err))
})

router.route('/add-note').post((req, res) => {
    const category = req.body.category
    const title = req.body.title
    const content = req.body.content
    
    const newNote = new Note({
        category,
        title,
        content,
    })
    
    newNote.save()
    .then(() => res.json('Note added!'))
    .catch(err => res.status(err).json('Error: ' + err))
    })

    module.exports = router

