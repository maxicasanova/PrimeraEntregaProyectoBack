const {Router} = require('express');
const router = Router();
const { 
    getProducts,
    putProduct,
    postProduct,
    getProduct,
    deleteProduct,
    postCarrito,
    deleteCarrito,
    getProdCarrito,
    postProdCarrito,
    deleteProdCarrito} = require('../controllers/routesController')

const admin = true;

function isAdmin (req, res, next) {
    if (admin){
        next();
    } else {
        res.json({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` })
    }
}

//rutas de productos

router.get('/productos', getProducts);

router.post('/productos', isAdmin, postProduct);

// en funcion del id

router.get('/productos/:id', getProduct);

router.put('/productos/:id', isAdmin, putProduct);

router.delete('/productos/:id', isAdmin , deleteProduct);


// carrito

router.post('/carrito', postCarrito);

router.delete('/carrito/:id', deleteCarrito);

router.get('/carrito/:id/productos', getProdCarrito);

router.post('/carrito/:id/productos', postProdCarrito);

router.delete('/carrito/:id/productos/:id_prod', deleteProdCarrito);

module.exports = router