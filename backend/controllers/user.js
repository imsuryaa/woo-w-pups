const User = require('../models/user')
const Order = require('../models/order')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                err: "NO USER WAS FOUND IN DB"
            })
        }
        // Storing user in req object and profile object
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    err: 'YOU ARE NOT ALLOWED TO UPDATE'
                })
            }
            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate('user', '_id name')
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                err: "No Order in this account"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    // Created an empty array for purchase list and pushing the elements
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
                _id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                quantity: product.quantity,
                amount: req.body.order.amount,
                transaction_id: req.body.order.transaction_id,
            })
        })

    User.findOneAndUpdate(
        {_id: req.profile._id},
        // updating purchases with local purchases array
        {$push: {purchases: purchases}},
        {new : true},
        (err, purchases) => {
            if(err) {
                return res.status(400).json({
                    error: 'Unable to save purchase list'
                })
            }
            next()
        }
    )
    
}