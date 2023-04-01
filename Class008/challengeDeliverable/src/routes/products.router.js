import { Router } from "express";
import productManager from "../managers/product.manager.js"

const router = Router();
const products = new productManager("../src/data/products.json");

router.get('/', async (req, res) => {
    const { limit } = req.query;
    if (limit) {
        const products = await products.getProducts();
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
    }
    else {
        const showProducts = await products.getProducts();
        res.send(showProducts);
    }
})

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const showProduct = await products.getProductById(parseInt(productId));
    res.send(showProduct);
})

router.post('/' , (req , res) => {
    const product = req.body;
    products.addProduct(product);
    res.send({status:"ok" , messsage:"Product created"});
})

router.put('/:pid' , async (req , res) => {
    let product = req.body;
    let id = req.params.pid;
    await products.updateProduct(Number(id) , product);
    res.send({status:"ok" , message:"Product updated"});
} )

router.delete('/:pid' , async (req , res) => {
    let id = req.params.pid;
    let quantity = await products.getProducts().length;
    let products = await products.deleteProduct(Number(id));
     if(quantity === products.length) {
         console.log(quantity , products);
         return res.status(400).send({status:"error" , error:"Incomplete information"})
     }
    res.send({status:"ok" , message:"Product deleted"})
})

export default router