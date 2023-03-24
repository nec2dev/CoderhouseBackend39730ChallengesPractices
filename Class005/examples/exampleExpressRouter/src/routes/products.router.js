//import { readFile } from 'fs/promises'

const express = require('express')
const Router = express.Router()
const productsRouter = Router()
//const products = await readFile('../data/products.json', 'utf-8')

//GET http://localhost:8080/api/productos
router.get('/', (req, res) => {
    res.send(products);
});

//GET http://localhost:8080/api/productos/1
router.get('/:id', (req, res) => {
    res.send(products);
});

//POST http://localhost:8080/api/productos
router.post('/', (req, res) => {
    const { title, description, price, thumbnail, code, stock, id } = req.body;
    res.send(products);
});

module.exports = productsRouter
