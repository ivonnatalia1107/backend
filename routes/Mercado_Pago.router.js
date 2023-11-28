const express = require('express');
const {Router} = require("express");
const mercadopago = require("mercadopago");
const Product = require('../models/Product.model')

const Mercado_Pago = express.Router();
const accessTokenMP = "TEST-1911582956099988-112611-4e90dcedd06c521a812c2f5210705a2c-383911558"


mercadopago.configure({
    access_token: accessTokenMP || "",
})

Mercado_Pago.post("/checkout", async (req, res) => {

    const product = Product(req.body)
try {

const preference = {
    items: [{
        title: product.name,
        picture_url: product.img,
        unit_price: product.price, 
        currency_id: "CLP",
        description: product.description,
        quantity: 1,

    },
],
    back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/fallo",

    },

    auto_return: "approved",
};

const resp = await mercadopago.preferences.create(preference);
console.log(resp.response.init_point)
res.status(200).json(resp.response.init_point);

} catch (error) {
console.error(error.message);
res.status(500).json(error.message);
}

})



module.exports = Mercado_Pago