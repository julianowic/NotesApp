const router = require('express').Router()
let Note = require('../models/note.model')
let User = require('../models/user.model')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, (req, res) => {
    Note.find({user : req.user.id}).sort({createdAt: -1})
    .then(notes => res.json(notes))
    .catch(err => res.status(err).json('Error: ' + err))
})

router.route('/add-note').post(protect, (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const category = req.body.category
    const user = req.user.id
    
    const newNote = new Note({
        title,
        content,
        category,
        user
    })
    
    newNote.save()
    .then(() => res.json({title, content, category, user}))
    .catch(err => res.status(err).json('Error: ' + err))
    })

router.route('/:id').delete(protect, async (req, res) => {
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted!'))
    .catch(err => res.status(err).json('Error ' + err))
})

router.route('/update/:id').post(protect, async (req, res) =>{
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    Note.findById(req.params.id)
    .then(note => {
        if(note.user.toString() !== user.id){
            res.status(401)
            throw new Error("User not authorized")
        } 
        note.category = req.body.category
        note.title = req.body.title
        note.content = req.body.content

        note.save()
        .then(() => res.json('Note updated!'))
        .catch(err => res.status(400).json('Error ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err)) 
})

router.route('/:id').get(protect, async (req, res) => { 
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    Note.findById(req.params.id) 
    .then(note => res.json(note))
    .catch(err => res.status(400).json("Error " + err))
  });

module.exports = router



