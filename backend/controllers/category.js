const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    // Getting category from param
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: 'Category not found in DB'
            })
        }
        req.category = cate
        next()
    })
}

exports.createCategory = (req, res) => {
    // creating category and extracting from user body
    const category = new Category(req.body)
    // saving to DB
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'Not able to save category in DB'
            })
        }
        res.json({category})
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'NO Categories found'
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to update category'
            })
        }
        res.json(updatedCategory)
    })
}

exports.removeCategory = (req, res) => {
    // its extracting from param
    const category = req.category
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: 'Failed to delete category'
            })
        }
        res.json({
            message: "Sucessfully deleted"
        })
    })
}