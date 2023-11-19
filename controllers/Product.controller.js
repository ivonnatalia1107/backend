const Product = require('../models/Product.model')

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body)
        const resp = await product.save()
        return res.json({
            message: 'El producto fue creado con exito',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const resp = await Product.find()

        return res.json({
            message: 'name',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const newData = req.body

        const resp = await Product.findByIdAndUpdate(
            newData.productId,
            { $set: newData },
            { new: true })

        return res.json({
            message: 'Producto actualizado',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const resp = await Product.findByIdAndDelete(req.body.productId)

        return res.json({
            message: 'Producto eliminado',
            detail: resp
        })
    } catch (err) {
        return res.json({
            message: 'Error',
            detail: err
        })
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}