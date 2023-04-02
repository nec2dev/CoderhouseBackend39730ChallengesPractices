import { Router } from "express";
import cartManager from "../managers/cart.manager.js";
import productManager from "../managers/product.manager.js"

const router = Router();
const carts = new cartManager("../data/carts.json");
const products = new productManager("../data/products.json");

router.post("/", async (req, res) => {
    await carts.addCart();
    const productsCarts = await carts.getCarts();
    res.send({ status: "ok", message: "Cart created", idCart: productsCarts.pop().id });
});

router.get("/:cid", async (req, res) => {
    const idCart = Number(req.params.cid);
    const arrayCarts = await carts.getCarts();
    const cart = arrayCarts.find((cart) => cart.id === idCart);
    cart ? res.send(cart.products) : res .status(400) .send({ status: "error", error: "The cart does not exist" });
});

router.get("/", async (req, res) => {
    const carts_ = await carts.getCarts();
    res.json({ carts_ });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const arrayCarts = await carts.getCarts();
    const arrayProducts = await products.getProducts()
    let cartIndex = arrayCarts.findIndex((cart) => cart.id == req.params.cid);
    let productIndex = arrayProducts.findIndex((p) => p.id == req.params.pid);
    if (cartIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "The cart does not exist",
        });
        return;
    }
    if (productIndex == -1) {
        res.status(400).send({
            status: "error",
            error: "The cart does not exist",
        });
        return;
    }
    await carts.addProductToCart(Number(req.params.cid) , Number(req.params.pid));
    res.send({ status: "ok", message: "Product added" });
})

export default router