import { Router } from "express";
import Products from "../dao/managers/product.manager.js"

const router = Router()
const productManager = new Products()

router.get('/', async (req,res) => {
    let products = await productManager.getAll()
    console.log(products)
    res.send({status:"success" , payload:products})
})

router.post('/' , async (req,res) => {
    const {title,description,price,thumbnail,code,stock,category} = req.body;
    let newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
    };

    const result = await productManager.saveProduct(newProduct);
    res.send({status:"success" , payload:result})
})

router.put('/:pid' , async (req,res) => {
    let id = req.params.pid;
    const {title,description,price,thumbnail,code,stock,category} = req.body;
    let updateProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
    };
    let result = await productManager.updateProduct(id,updateProduct)
    res.send({status:"success" , payload:result})
})

router.delete('/:pid' , async (req,res) => {
    let id = req.params.pid
    let result = await productManager.deleteProduct(id);
    res.send({status:"success" , payload:result})
})

export default router