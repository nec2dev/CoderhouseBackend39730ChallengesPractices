import { Router } from "express"
import Messages from "../dao/managers/message.manager.js"
import Users from "../dao/managers/user.manager.js"

const router = Router()
const messagesManager = new Messages()
const usersManager = new Users()

router.get('/products' , async (req,res) => {
    const {
        page=1,
        limit=5,
        sort,
        category="",
    } = req.query;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    await productsModel.paginate({category:{$regex:category}} , {sort:{price:sort}, limit , page , lean:true});
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

router.get('/carts/:cid' , async (req,res) => {
    let cid = req.params.cid;
    let cart = await cartsModel.findById(cid).populate("products.product").lean();
    let cartProducts = cart.products
    console.log(cartProducts);
    res.render('carts' , {cart, cartProducts})
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