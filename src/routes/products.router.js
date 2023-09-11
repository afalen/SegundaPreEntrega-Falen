const {Router} = require('express')
const {productModel} = require('../models/products.model')

const router = Router()

router.get('/products', async(req, res)=>{
    try{
        const limit = parseInt(req.query.limit) || 10
        const page = parseInt(req.query.page) || 1
        const sort = parseInt(req.query.sort)
        const query = req.query.query 

        let products

        if(!query && !sort){
            products = await productModel.paginate({}, {limit: limit, page: page })
        }else if(!query){
            products = await productModel.paginate({}, {limit: limit, page: page, sort: {precio: sort} })
        }else{
            products = await productModel.paginate({categoria: query}, {limit: limit, page: page, sort: {precio: sort} })
        }

        console.log(products) 
        
        res.send({result: 'success', payload: products})
    }catch(error){
        console.error(error)
    }
})










// MOSTRAR LOS PRODUCTOS
/* router.get('/products', async(req,res)=>{
    try{
        let products = await productModel.find()
        res.send({result: 'success', payload: products})
    }catch(error){
        console.error(error)
    }
}) */

// AGREGAR UN PRODUCTO
router.post('/products', async(req,res)=>{
    let {nombre, categoria, precio, stock, imagen} = req.body
    if(!nombre || !categoria || !precio || !stock || !imagen){
        res.send({status: "error", error: "Faltan parámetros"})
    }

    let result = await productModel.create({nombre, categoria, precio, stock, imagen})
    res.send({result: "success", payload: result})
})

// MODIFICAR UN PRODUCTO
router.put('/products/:uid', async(req,res)=>{
    let {uid} = req.params

    let productToReplace = req.body

    if(!productToReplace.nombre || !productToReplace.categoria || !productToReplace.precio || !productToReplace.stock || !productToReplace.imagen){
        res.send({status:'error', error:'Faltan parámetros'})
    }

    let result = await productModel.updateOne({_id: uid}, productToReplace)
    res.send({result: 'success', payload: result})

})

// ELIMINAR UN PRODUCTO
router.delete('/products/:uid', async(req,res)=>{
    let {uid} = req.params
    let result = await productModel.deleteOne({_id: uid})
    res.send({result: "success", payload: result})
})




module.exports = router