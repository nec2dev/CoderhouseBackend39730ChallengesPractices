import { Router } from "express"
import Carts from "../dao/managersmdb/cart.manager.js"
import Messages from "../dao/managersmdb/message.manager.js"
import Products from "../dao/managersmdb/product.manager.js"
import Users from "../dao/managersmdb/user.manager.js"

const router = Router()
const cartsManager = new Carts()
const messagesManager = new Messages()
const productsManager = new Products()
const usersManager = new Users()

router.get('/products' , async (req,res) => {
    let products = await productsManager.getAll();
    console.log(products);
    res.render('products' , {products})
})

router.get('/carts' , async (req,res) => {
    let carts = await cartsManager.getAll()
    console.log(carts);
    res.render('carts' , {carts})
})

router.get('/messages' , async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
})

router.get('/users' , async (req,res) => {
    let users = await usersManager.getAll();
    console.log(users);
    res.render('chat' , {users})
})

export default router;