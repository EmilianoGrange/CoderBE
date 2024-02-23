import { Router } from 'express';

import ProductsDAO from '../daos/products.dao.js';

import upload from '../utils/upload.js';

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductsDAO.getAllProducts(req.query.limit);
    res.render('home', {products});
});

// router.get('/:id', async (req, res) => {
//     if(!req.params.id) return res.redirect('/');

//     const product = await ProductsDAO.getProductById(req.params.id);
//     if(!product) return res.render('404');
//     res.render('product', {
//         title: product?.title,
//         description: product?.description,
//         price: product?.price,
//         imgs: product?.thumbnail,
//         hasStock: product?.stock > 0
//     });
// });

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductsDAO.getAllProducts(req.query.limit);
    res.render('realTimeProducts', {products});
});

router.post('/realtimeproducts', upload.single('image'), async (req, res) => {
    const filename = req.file.filename;
    const product = req.body;

    await ProductsDAO.addProduct(product.title, product.description, product.category, product.price, product.code, product.stock, filename);

    res.redirect("/realtimeproducts")
});

export default router;