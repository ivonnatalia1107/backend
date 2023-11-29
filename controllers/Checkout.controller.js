const Product = require('../models/Product.model');


const checkoutProduct = async (req, res) => {

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

}


module.exports = { checkoutProduct }