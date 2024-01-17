import { Router } from 'express';

import CartManager from '../CartManager.js';

import ProductManager from '../ProductManager.js';

const router = Router();

const cartManager = new CartManager('./data/carts.json');

const productManager = new ProductManager('./data/productos.json');

router.post('/', async (req, res) => {
    const id = await cartManager.createCart();
    res.json({status: "success", id});
});

router.get('/:cid', async (req, res) => {
    let id = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(id);
    if(!cart) return res.status(404).json({status: "error", error: "no existe ese carrito"});
    res.json({status: "success", payload: cart.products});
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cid);
    if(!cart) return res.status(404).json({status: "error", error: "no existe ese carrito"});
    const pid = parseInt(req.params.pid);
    const buscado = await productManager.getProductById(pid);
    if(!buscado) return res.status(404).json({status: "error", error: "producto no encontrado"});
    const index = cart.products.findIndex(p => p.product == pid);
    (index !== -1) ? cart.products[index].quantity++ : cart.products.push({product: pid, quantity: 1});
    const updated = await cartManager.saveCart(cid, cart);
    res.json({status: "success", payload: updated});
});

router.delete('/:cid', async (req, res) => {
    const cid = JSON.parse(req.params.cid);
    const eliminado = await cartManager.deleteCart(cid);
    res.json({status: "success", eliminado});
});

export default router;