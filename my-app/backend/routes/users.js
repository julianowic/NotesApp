const router = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
let User = require('../models/user.model')

// router.route('/').post((req, res) => {
//     const name = req.body.title
//     const content = req.body.content
//     const category = req.body.category
    
//     const newUser = new User({
//         name,
//         email,
//         password
//     })
    
//     newUser.save()
//     .then(() => res.json('User registered!'))
//     .catch(err => res.status(err).json('Error: ' + err))
//     })
const registerUser = asyncHandler(async (req, res) => {
    res.json("registerUser")
})

const loginUser = asyncHandler(async (req, res) => {
    res.json("loginUser")
})

const getUser = asyncHandler(async (req, res) => {
    res.json("getUser")
})

router.route('/').post(registerUser)

router.route('/login').post(loginUser)

router.route('/me').get(getUser)

module.exports = router
