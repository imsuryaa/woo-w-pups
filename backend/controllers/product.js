const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    // object form created for adding product details with image
    let form = new formidable.IncomingForm()
    // used for keeping images in png or jpeg format
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                err: 'problem with image'
            })
        }
        //destructuring the fields
        const { name, description, gender, price, category} = fields
        // Validation
        if(!name || !description || !gender || !price || !category) {
            return res.status(400).json({
                error: 'Please include all fields'
            })
        }

        let product = new Product(fields)
        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size is too big'
                })
            }
            // inserting image with formidable and fs methods
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contenType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: 'Saving tshirt in DB failed'
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(res.product)
}

// Middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

// delete controllers
exports.removeProduct = (req, res) => {
    let product = req.product
    product.remove((err, removedProduct) => {
        if(err) {
            return res.status(400).json({
                error: 'Failed to delete the product'
            })
        }
        res.json({
            message: 'Deletion is sucess', removedProduct
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    // used for keeping images in png or jpeg format
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                err: 'problem with image'
            })
        }

        let product = req.product
        // updating with lodash and its methods
        // fields from formdiable
        product = _.extend(product, fields)
        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size is too big'
                })
            }
            // inserting image with formidable and fs methods
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contenType = file.photo.type
        }

        // save to DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: 'updation failed'
                })
            }
            res.json(product)
        })
    })
}

// Product listing
exports.getAllProducts = (req, res) => {
    // Using parseInt to convert the user input from string to int
    // req.query.limit(user input) will be string by default in every language
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
        if(err) {
            return res.status(400).json({
                error: 'No products found'
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct('category', {}, (err, category) => {
        if(err) {
            return res.status(400).json({
                error: 'No category found'
            })
        }
        res.json(category)
    })
}


exports.updateStock = (req, res, next) => {
    // Operations to handle both stock and sold items to update the inventory
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error: 'Bulk operation failed'
            })
        }
        next()
    })
}

