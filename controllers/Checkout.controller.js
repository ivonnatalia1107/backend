const Product = require('../models/Product.model');
const mercadopago = require("mercadopago");


const checkoutProduct = async (req, res) => {

    const product = new Product(req.body)
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
        success: "https://github.com/ivonnatalia1107/proyecto-e-commerce/success",
        failure: "https://github.com/ivonnatalia1107/proyecto-e-commerce/fallo",

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

}


module.exports = { checkoutProduct }