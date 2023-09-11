const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const productsRouter = require('./routes/products.router');
const { productModel } = require('./models/products.model')
const cartsRouter = require('./routes/carts.router');
const mongoosePaginate = require('mongoose-paginate-v2')
const app = express();
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())

/* mongoose.connect('mongodb+srv://ecommerceArmandof:falen159@cluster0.yopbtr6.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(()=>{
    console.log("Conectado a la DB de Mongo Atlas")
})
.catch(error=>{
    console.error("Error en la conexión\n", error)
}) */


const enviroment = async()=>{
    await mongoose.connect('mongodb+srv://ecommerceArmandof:falen159@cluster0.yopbtr6.mongodb.net/?retryWrites=true&w=majority')

    console.log("Conectado a la base de datos")

    //ordenando por precio
    // 1 => ascendente
    // -1 => descendente


    //console.log(productos)
}

enviroment()


app.use('/', productsRouter)