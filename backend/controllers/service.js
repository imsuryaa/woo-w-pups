const Service = require('../models/service')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getServiceById = (req, res, next, id) => {
    Service.findById(id)
    // .populate('category')
    .exec((err, service) => {
        if (err) {
            return res.status(400).json({
                error: 'Service not found'
            })
        }
        req.service = service
        next()
    })
}

exports.createService = (req, res) => {
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
        const { name, description, address, price, petsowned} = fields
        // Validation
        if(!name || !description || !address || !price || !petsowned) {
            return res.status(400).json({
                error: 'Please include all fields'
            })
        }

        let service = new Service(fields)
        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size is too big'
                })
            }
            // inserting image with formidable and fs methods
            service.photo.data = fs.readFileSync(file.photo.path)
            service.photo.contenType = file.photo.type
        }

        // save to DB
        service.save((err, service) => {
            if(err) {
                res.status(400).json({
                    error: 'Saving tshirt in DB failed'
                })
            }
            res.json(service)
        })
    })
}

exports.getService = (req, res) => {
    req.service.photo = undefined
    return res.json(res.service)
}

// Middleware
exports.photo = (req, res, next) => {
    if(req.service.photo.data) {
        res.set('Content-Type', req.service.photo.contentType)
        return res.send(req.service.photo.data)
    }
    next()
}

// delete controllers
exports.removeService = (req, res) => {
    let service = req.service
    service.remove((err, removedService) => {
        if(err) {
            return res.status(400).json({
                error: 'Failed to delete the service'
            })
        }
        res.json({
            message: 'Deletion is sucess', removedService
        })
    })
}

exports.updateService = (req, res) => {
    let form = new formidable.IncomingForm()
    // used for keeping images in png or jpeg format
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                err: 'problem with image'
            })
        }

        let service = req.service
        // updating with lodash and its methods
        // fields from formdiable
        service = _.extend(service, fields)
        // handle file
        if(file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size is too big'
                })
            }
            // inserting image with formidable and fs methods
            service.photo.data = fs.readFileSync(file.photo.path)
            service.photo.contenType = file.photo.type
        }

        // save to DB
        service.save((err, service) => {
            if(err) {
                res.status(400).json({
                    error: 'updation failed'
                })
            }
            res.json(service)
        })
    })
}

// Product listing
exports.getAllServices = (req, res) => {
    // Using parseInt to convert the user input from string to int
    // req.query.limit(user input) will be string by default in every language
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Service.find()
    .select('-photo')
    // .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, services) => {
        if(err) {
            return res.status(400).json({
                error: 'No services found'
            })
        }
        res.json(services)
    })
}

// exports.getAllUniqueCategories = (req, res) => {
//     Product.distinct('category', {}, (err, category) => {
//         if(err) {
//             return res.status(400).json({
//                 error: 'No category found'
//             })
//         }
//         res.json(category)
//     })
// }


// exports.updateStock = (req, res, next) => {
//     // Operations to handle both stock and sold items to update the inventory
//     let myOperations = req.body.order.products.map(prod => {
//         return {
//             updateOne: {
//                 filter: {_id: prod._id},
//                 update: {$inc: {stock: -prod.count, sold: +prod.count}}
//             }
//         }
//     })

//     Product.bulkWrite(myOperations, {}, (err, products) => {
//         if(err) {
//             return res.status(400).json({
//                 error: 'Bulk operation failed'
//             })
//         }
//         next()
//     })
// }