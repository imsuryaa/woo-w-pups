const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

// User Schema design in DB with mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true})

// Virtual field creation
// Reffering the virtual method with password and it will be stored in encry_password in DB
userSchema.virtual('password')
    .set(function(password) {
        this._password = password                   // Convention of using private variable
        this.salt = uuidv1()                        // populating salt with uuid
        this.encry_password = this.securePassword(password)
    })
    .get(function() {
        return this._password
    })

// Crypto format for password storing in DB
userSchema.methods = {
    // For authentication of user
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },
    // For securing password
    securePassword: function(plainpassword) {
        if (!plainpassword) return ""
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex')
        } catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model('User', userSchema)