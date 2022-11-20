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
    const {name, email, password} = req.body

    //validate

    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    //hash password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create new user

    const user = await User.create({
        name : name, 
        email : email, 
        password : hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email 
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
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
