import '../models/Product.model';
const express = require('express');
const app = express();

// MERCADO PAGO
app.use(express.json());
const mercadopago = require("mercadopago")
const { update } = require('../models/Product.model')

mercadopago.configure({
    access_token: "TEST-2038802161039729-112611-1d33ccf9c7b0ed62ef505dcc2ceac319-1567073288"
})


// C. CHECKOUT MERCADOPAGO


app.post("/mercadopago", async (req, res) => {
    try {
        const preference = req.body;
        const responseMP = await mercadopago.preferences.create(preference);
        console.log(responseMP);
        res.json({
            checkoutId: responseMP.body.id
        });
    } catch (error) {
        console.error("Error en el proceso de Mercado Pago:", error);
        res.status(500).json({ error: "Error en el proceso de Mercado Pago" });
    }
});
