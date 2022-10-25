const router = require('express').Router()
let Category = require('../models/category.model')


router.route('/').get((req, res) => {
    Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(err).json('Error: ' + err))
})

router.route('/add').post((req, res) => {

const category = req.body.category
const newCategory = new Category({category})

newCategory.save()
.then(() => res.json('Category added!'))
.catch(err => res.status(err).json('Error: ' + err))
})

module.exports = router






