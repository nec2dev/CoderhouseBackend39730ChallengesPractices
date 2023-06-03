import UserManager from "../dao/managers/user.manager.js";
import cartModel from "../dao/models/cart.model.js";
import productModel from "../dao/models/product.model.js";

const userManager = new UserManager();

const renderUsers = async (req,res)=>{
    let users = await userManager.getAll();
    console.log(users);
    res.render ('users',{users})
}

const renderProducts = async (req,res) => {
    const isLogin = req.session.user ? true : false;
    const user = req.session.user;
    const {
        page=1,
        limit=5,
        sort,
        category="",
    } = req.query;
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = 
    await productModel.paginate({category:{$regex:category}} , {sort:{price:sort}, limit , page , lean:true});
    const products = docs;
    res.render('products' , {
        isLogin,
        user,
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    });  
}

const renderCart = async (req,res) => {
    let cid = req.params.cid;
    let cart = await cartModel.findById(cid).populate("products.product").lean();
    let cartProducts = cart.products
    console.log(cartProducts);
    res.render('carts' , {cart, cartProducts})
}

const renderMessages = async (req,res) => {
    let messages = await messagesManager.getAll();
    console.log(messages);
    res.render('chat' , {messages})
}

const renderRegister = (req,res)=>{
    res.render('register');
}

const renderLogin = (req,res)=>{
    res.render('login');
}

const logout = async (req, res) => {
    req.session.destroy();
    res.send("logout success!");
}

export default {
    renderUsers,
    renderProducts,
    renderCart,
    renderMessages,
    renderRegister,
    renderLogin,
    logout
}