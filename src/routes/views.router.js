import { Router } from 'express';

import ProductsDao from '../daos/products.dao.js';

const router = Router();

const limit = 10;

router.get('/', async (req, res) => {
    const products = await ProductsDao.getAllProducts(limit);
    res.render('home', {products});
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductsDao.getAllProducts(limit);
    res.render('realTimeProducts', {products});
});

export default router;