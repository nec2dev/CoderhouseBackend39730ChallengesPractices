import Router from "express";
import cartManager from "../dao/cart.dao.js";

const router = Router();
const cartManager = new cartManager();
router.post('/', async (req,res) => {
    const resp = await cartManager.createCart({productos: []})
    res.send({resp}) 
})
router.post('/:cid/productos/:pid', async (req,res) => {
    const {cid, pid} = req.params
    const resp = await cartManager.addProductInCart(parseInt(cid),parseInt(pid))
    res.send({resp}) 
})
router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const resp = await cartManager.getCartById(parseInt(cid))
    res.send({resp}) 
})
