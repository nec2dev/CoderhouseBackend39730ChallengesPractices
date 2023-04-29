import { Router } from "express"
import Carts from "../dao/managers/cart.manager.js"
import Messages from "../dao/managers/message.manager.js"
import Products from "../dao/managers/product.manager.js"
import Users from "../dao/managers/user.manager.js"
import productModel from "../dao/models/product.model.js"
import cartModel from "../dao/models/cart.model.js"

const router = Router()
const cartManager = new Carts()
const messageManager = new Messages()
const productManager = new Products();
const userManager = new Users()

router.get('/products' , async (req,res) => {
    const {
        page=1,
        limit=5,
        sort,
        category="",
    } = req.query;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    await productModel.paginate({category:{$regex:category}}, {sort:{price:sort}, limit, page, lean:true});
    const products = docs;
    res.render('products' , {
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    });
})

router.get('/carts' , async (req,res) => {
    let carts = await cartManager.getAll();
    console.log(carts);
    res.render('carts', {carts})
})

router.get('/carts/:cid' , async (req,res) => {
    let cid = req.params.cid;
    let cart = await cartModel.findById(cid).populate("products.product").lean();
    let cartProducts = cart.products
    console.log(cartProducts);
    res.render('carts' , {cart, cartProducts})
})

router.get('/messages' , async (req,res) => {
    let messages = await messageManager.getAll();
    console.log(messages);
    res.render('messages' , {messages})
})

router.get('/users' , async (req,res) => {
    let users = await userManager.getAll();
    console.log(users);
    res.render('users' , {users})
})

export default router;