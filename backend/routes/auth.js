const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')

// Imported from controllers
router.post('/signup', [
    // Signup - Data validation with express-validator
    check('name', 'name should be atleast 3 characters').isLength({min: 3}),
    check('email', 'email is required').isEmail(),
    check('password', 'password should be atleast 3 characters').isLength({min: 3})
], signup)

router.post('/signin', [
    // Signin - Data validation with express-validator
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 3})
], signin)

router.get('/signout', signout)


module.exports = router