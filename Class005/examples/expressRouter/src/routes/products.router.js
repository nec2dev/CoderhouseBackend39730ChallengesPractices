import { Router } from 'express';

const express = require('express');
const productsRouter = require('./routes/products.router');

//GET http://localhost:8080/api/productos
router.get('/', (req, res) => {
    res.send('products');
});

//GET http://localhost:8080/api/productos/1
router.get('/:id', (req, res) => {
    res.send('products');
});

//POST http://localhost:8080/api/productos
router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock, id } = req.body;
    res.send('products');
});

export default productsRouter;
//module.exports = { userRouter };
