const User = require("../models/User");
const jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.TOKEN_SECRET, {expiresIn: '1d'})
}

const signUp = expressAsyncHandler( async (req, res) => {
    const { fullname, username, password } = req.body

    if(!fullname || !username || !password) {
       return res.status(404).json({
           message: 'All fields are required'
        })
        
    }

    const userExist = await User.findOne({username})

    if(userExist) {
        return res.status(404).json({
            message: 'User already exists'
         })
    }

    const user = await User.create({
        fullname,
        username,
        password
    })

    const token = generateToken(user._id)

    res.cookie('token', token, {
        path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), //this is same as one day
            sameSite: 'none',
            secure: true
    })

    const saveUser = await user.save()
    res.status(200).json({
        message: 'User registered succesfully',
        id: saveUser._id,
        username: saveUser.username,
        token

    })
})

const signIn = expressAsyncHandler( async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(404).json({
            message: 'All fields are required'
         })
         
     }

    const user = await User.findOne({username})

    if(!user) {
        return res.status(404).json({
            message: 'No user founded, please signup'
         })
    }

    const isPasswordCorrect = await user.validatePassword(password)

    if(!isPasswordCorrect) {
        return res.status(404).json({
            message: 'Email or password are not correct'
         })
    }

    const token = generateToken(user._id)

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //this is same as one day
        sameSite: 'none',
        secure: true
    })

    if(user && isPasswordCorrect) {
        res.status(200).json({
            message: 'Logged in succesfully',
            id: user._id,
            username: user.username,
            token  

        })
    } else {
        return res.status(404).json({
            message: 'Invalid email or password',
            id: user._id,
            username: user.username
         })
    }
})

module.exports = {
    signUp,
    signIn
}
