const express = require('express');
const mercadopago = require("mercadopago");
const router = express.Router();
const accessTokenMP = "TEST-1911582956099988-112611-4e90dcedd06c521a812c2f5210705a2c-383911558"
const {checkoutProduct} = require('../controllers/Checkout.controller')
const auth = require('../middlewares/auth')

mercadopago.configure({
    access_token: accessTokenMP || "",
})

router.post("/",auth, checkoutProduct)


module.exports = router