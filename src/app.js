import express from 'express';

import ProductManager from './ProductManager.js';

const productManager = new ProductManager('./data/productos.json');

const app = express();

app.get('/', (req, res) => {
    res.send(`<h1>Server con Express</h1>`);
});

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const productos = await productManager.getProducts();
    if(limit && limit < productos.length) return res.send({status: 'success', productos: productos.slice(0,limit)});
    res.send({status: 'success', productos});
});

app.get('/products/:pid', async (req, res)=> {
    const productos = await productManager.getProducts();
    let id = parseInt(req.params.pid);
    let buscado = productos.find(p => p.id === id);
    if(!buscado) return res.send({error: 'producto no encontrado'});
    res.send({status: 'success', buscado});
});

app.listen(8080, ()=> console.log('Server listening on port 8080'));