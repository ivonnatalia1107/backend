const express = require('express');
const router = express.Router();
const userRoutes = require('./User.router');
const productRoutes = require('./Product.router');
const checkoutRoutes = require('./Checkout.router')

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/checkout' , checkoutRoutes);

module.exports = router;