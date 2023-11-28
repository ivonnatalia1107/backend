require('dotenv').config()
const express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./routes')
const app = express()
const cors = require('cors')
const Mercado_Pago = require("./routes/Mercado_Pago.router")


const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions))
app.use(express.json())

app.use("/Mercado_Pago", Mercado_Pago)

mongoose.connect(process.env.MONGO_URI)

app.use('/v1', routes)


app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto ' + process.env.PORT)
})