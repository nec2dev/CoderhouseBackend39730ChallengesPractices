import { Router } from "express"
import Carts from "../dao/managers/cart.manager.js"
import Products from "../dao/managers/product.manager.js"

const router = Router()
const cartsManager = new Carts()
const productManager = new Products()

router.get('/', async (req, res) => {
    let carts = await cartsManager.getAll();
    res.send({ status: "success", payload: carts })
})

router.post('/', async (req, res) => {
    const result = await cartsManager.saveCart();
    res.send({ status: "success", payload: result });
})

router.delete('/:cid', async (req, res) => {
    let id = req.params.cid;
    const result = await cartsManager.deleteCart(id);
    res.send({ status: "success", payload: result });
})

router.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let result = await cartsManager.addProductToCart(cid, pid);
    res.send({ status: "success", payload: result });
})

router.delete('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let productExist = await productManager.getOne(pid);
    if (!productExist) {
        res.send({ status: 404, message: "El producto no existe" });
    }
    else {
        let cart = await cartsManager.getOne(cid);
        if (!cart) {
            res.send({ status: 404, message: "El carrito no existe" });
        }
        else {
            let productInCartIndex = cart.products.findIndex(p => p.product === pid)
            if (productInCartIndex == -1) {
                res.send({ status: 404, message: "El producto no existe dentro del carrito" });
            }
            else {
                cart.products.splice(productInCartIndex, 1);
                let result = await cartsManager.updateCart(cid, cart);
                res.send({ status: "Ok", payload: result });
            }
        }
    }
})

export default router