const router = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
let User = require('../models/user.model');
const {protect} = require('../middleware/authMiddleware')

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
            email: user.email, 
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body

    // Check for user email
    const user = await User.findOne({email})
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })

const getUser = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({id : _id, name, email})
})

//generate JWT token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

router.route('/').post(registerUser)

router.route('/login').post(loginUser)

router.route('/me').get(protect, getUser)

module.exports = router
