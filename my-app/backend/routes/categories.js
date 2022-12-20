const router = require('express').Router()
let Category = require('../models/category.model')
let User = require('../models/user.model')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, (req, res) => {
    Category.find({user : req.user.id})
    .then(categories => res.json(categories))
    .catch(err => res.status(err).json('Error: ' + err))
})

router.route('/add-category').post(protect, (req, res) => {

const category = req.body.category
const user = req.user.id

const newCategory = new Category({user, category})

newCategory.save()
.then(() => res.json('Category added!'))
.catch(err => res.status(err).json('Error: ' + err))
})

router.route('/:id').delete(protect, async (req, res) => {
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    
    Category.findByIdAndDelete(req.params.id)
    .then(() => res.json('Category deleted!'))
    .catch(err => res.status(err).json('Error ' + err))
})

module.exports = router






