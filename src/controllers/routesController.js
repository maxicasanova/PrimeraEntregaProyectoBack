const Contenedor = require('../contenedor');

const productos = new Contenedor('productos.txt');
const carritos = new Contenedor('carritos.txt')

const getProducts = async (req, res) => {
    try{
        const list = await productos.getAll();
        res.json(list);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }
};

const postProduct = async (req, res) => {
    const {nombre, descipcion, codigo, foto, precio, stock} = req.body;
    const date = Date.now();
    try {
        const list = await productos.getAll();
        await productos.save({id:list.length+1,timestamp: date, nombre, descipcion, codigo, foto, precio, stock});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const getProduct = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const prod = await productos.getById(id);
        res.json(prod);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const putProduct = async (req, res) => {
    const id = req.params.id;
    const {nombre, descipcion, codigo, foto, precio, stock} = req.body;
    try {
        await productos.update(id, {nombre, descipcion, codigo, foto, precio, stock});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        await productos.deleteById(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const postCarrito = async (req, res) => {
    const {productos} = req.body;
    const date = Date.now();
    try {
        const list = await carritos.getAll();
        await carritos.save({id:list.length+1,timestamp: date, productos: JSON.parse(productos)});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const deleteCarrito = async (req, res) => {
    const id = req.params.id;
    try {
        await carritos.deleteById(id);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const getProdCarrito = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const cart = await carritos.getById(id);
        res.json(cart.productos);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const postProdCarrito =  async (req, res) => {
    const id = req.params.id;
    const {nombre, descipcion, codigo, foto, precio, stock} = req.body;
    try {
        await carritos.saveProd(id, {nombre, descipcion, codigo, foto, precio, stock});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}

const deleteProdCarrito = async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    try {
        await carritos.deleteProdById(id, id_prod);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
}


module.exports = {
    getProducts,
    putProduct,
    postProduct,
    getProduct,
    deleteProduct,
    postCarrito,
    deleteCarrito,
    getProdCarrito,
    postProdCarrito,
    deleteProdCarrito
}