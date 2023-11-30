const express = require('express');
const mercadopago = require("mercadopago");
const router = express.Router();
require('dotenv').config();
const accessTokenMP = process.env.ACCES_TOKEN 
const {checkoutProduct} = require('../controllers/Checkout.controller')


mercadopago.configure({
    access_token: accessTokenMP || "",
})

router.post("/", checkoutProduct)


module.exports = router