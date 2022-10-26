const router = require('express').Router()
let Note = require('../models/note.model')

router.route('/').get((req, res) => {
    Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(err).json('Error: ' + err))
})

router.route('/add-note').post((req, res) => {
    const title = req.body.title
    const content = req.body.content
    const category = req.body.category
    
    const newNote = new Note({
        title,
        content,
        category,
    })
    
    newNote.save()
    .then(() => res.json('Note added!'))
    .catch(err => res.status(err).json('Error: ' + err))
    })

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted!'))
    .catch(err => res.status(err).json('Error ' + err))
})

router.route('/update/:id').post((req, res) =>{
    Note.findById(req.params.id)
    .then(note => {
        note.category = req.body.category
        note.title = req.body.title
        note.content = req.body.content

        note.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err)) 
})

module.exports = router



