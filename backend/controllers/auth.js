const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    // For populating error messages
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(402).json({
            // converting the error to Array to access the elements
            error: errors.array()[0].msg
        })
    }
    // Storing the details in user variable by defining User Object
    const user = new User(req.body)
    // Saving into DB by mongoose method
    user.save( (err, user) => {
        if(err) {
            return res.status(400).json({
                err: 'NOT ABLE TO SAVE USER IN DB'
            })
        }
        // Destructuring the json response for user details
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}

exports.signin = (req, res) => {
    const errors = validationResult(req)
    // Destructuring data to validate email & password
    const { email, password } = req.body
    if(!errors.isEmpty()) {
        return res.status(402).json({
            // converting the error to Array to access the elements
            error: errors.array()[0].msg
        })
    }
    // Method to check email in DB
    User.findOne({email}, (err, user) => {
        // to validate with the error 
        if(err || !user) {
            return res.status(400).json({
                error: 'USER EMAIL DOES NOT EXISTS'
            })
        }
        // to validate password with our defined method - 'authenticate'
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: 'EMAIL & PASSWORD DO NOT MATCH'
            })
        }
        // Create a token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        // Put token in cookie
        res.cookie('token', token, {expire: new Date() + 9999})
        // Send response to front end app
        const { _id, name, email, role } = user
        return res.json({token, user: {_id, name, email, role}})
    })

}

// Signout can be achieved by clearing the cookies in browser
exports.signout = (req, res) => {
    // Method to clear cookie and token
    res.clearCookie('token')
    res.json({
        message: "USER SIGNOUT SUCCESSFULLY"
    })
}

// Protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

// Custom Middlewares
exports.isAuthenticated = (req, res, next) => {
    // profile property will be set in front end
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    // Validating with role - if it is 0 then user is a customer
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "YOU ARE NOT ADMIN"
        })
    }
    next()
}