import { Router } from 'express';

import ProductsDAO from '../daos/products.dao.js';

const router = Router();

router.get('/', async (req, res) => {

    try {
        const products = await ProductsDAO.getAllProducts(req.query.limit);
        res.status(200).send({
            status: 200,
            result: 'success',
            payload: products
        });
    }
    catch (err) {
        console.log(`Cannot get products from Mongo: ${err}`)
        res.status(500).send({
            status: 500,
            result: 'error',
            error: 'Error getting data from DB'
        });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const buscado = await ProductsDAO.getProductById(req.params.pid);
        if (!buscado) {
            return res.status(404).send({
                status: 404,
                result: "error",
                error: "Product not found"
            });
        }
        res.status(200).send({
            status: 200,
            result: 'success',
            payload: buscado
        });
    }
    catch (err) {
        console.log(`Cannot get product from Mongo: ${err}`);
        res.status(500).send({
            status: 500,
            result: 'error',
            error: 'Error obtaining data from DB'
        });
    }
});

router.post('/', async (req, res) => {
    const producto = req.body;
    if (!producto.title || !producto.description || !producto.category || !producto.price || !producto.code || !producto.stock) {
        return res.status(400).send({
            status: 400,
            result: 'error',
            error: "Incomplete values"
        });
    }
    try {
        const addedProduct = await ProductsDAO.addProduct(...producto);
        res.status(200).send({
            status: 200,
            result: 'success',
            payload: addedProduct
        });
    }
    catch (err) {
        console.log(`Cannot save product on Mongo: ${err}`);
        res.status(500).send({
            status: 500,
            result: 'error',
            error: 'Error saving data on DB'
        });
    }
});

router.put('/:pid', async (req, res) => {
    const producto = req.body;
    if (!producto.title || !producto.description || !producto.category || !producto.price || !producto.code || !producto.stock || !req.params.pid) {
        return res.status(400).json({
            status: 400,
            result: 'error',
            error: "Incomplete values"
        });
    }

    try {
        const updated = await ProductsDAO.updateProduct(req.params.pid, producto);
        res.status(200).send({
            status: 200,
            result: 'success',
            payload: updated
        });
    }
    catch (err) {
        console.log(`Cannot update product on Mongo: ${err}`);
        res.status(500).send({
            status: 500,
            result: 'error',
            error: 'Error updating data on DB'
        });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await ProductsDAO.removeProduct({_id: req.params.pid});
        res.status(200).send({
            status: 200,
            result: 'success',
            payload: deleted
        });
    }
    catch (err) {
        console.log(`Cannot delete product on Mongo: ${err}`);
        res.status(500).send({
            status: 500,
            result: 'error',
            error: 'Error deleting data on DB'
        });
    }
});

export default router;