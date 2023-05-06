import { Router } from "express";
import CartManager from "../dao/managers/cart.manager.js";
import ProductManager from "../dao/managers/product.manager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new Products();

router.post("/", async (req, res) => {
  const cart = { product: [] };
  const newCart = await cartManager.createCart(cart);
  res.status(201).send({ status: "Success", payload: newCart });
});

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.send({ status: "success", payload: carts });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  return res.send({ status: "Success", payload: cart });
});

//update cart

router.delete("/:cid", async (req, res) => {
  const id = req.params.cid;
  const result = await cartManager.deleteCart(id);
  res.send({ status: "success", payload: result });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await cartManager.addProductToCart(cid, pid);
  res.send({ status: "success", payload: result });
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const productExist = await productManager.getProductById(pid);
  if (!productExist) {
    res.send({ status: 404, message: "The product does not exist" });
  } else {
    let cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.send({ status: 404, message: "The cart does not exist" });
    } else {
      let productInCartIndex = cart.products.findIndex(
        (p) => p.product === pid
      );
      if (productInCartIndex == -1) {
        res.send({
          status: 404,
          message: "The product does not exist into the cart",
        });
      } else {
        cart.products.splice(productInCartIndex, 1);
        let result = await cartManager.updateCart(cid, cart);
        res.send({ status: "Ok", payload: result });
      }
    }
  }
});

router.put("/:cid", async (req, res) => {
  let cid = req.params.cid;
  let products = req.body;
  let cart = await cartManager.getCartById(cid);
  let cartProducts = cart.products;
  let productsIds = [];
  if (cartProducts.length > 0) {
    cartProducts.forEach((product) => {
      productsIds.push(product._id);
    });
  }
  products.forEach(async (product) => {
    let productIndex = productsIds.findIndex((p) => p == product._id);

    if (productIndex != -1) {
      cartProducts[productIndex].quantity = product.quantity;
    } else {
      cartProducts.push(product);
    }
  });
  cart.products = cartProducts;
  let result = await cartManager.updateCart(cid, cart);
  res.send({ status: "success", payload: result });
});

router.put("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let { quantity } = req.body;
  let cart = await cartManager.getCartById(cid);
  let productExist = false;
  cart.products.forEach((product) => {
    if (product._id == pid) {
      product.quantity = quantity;
      productExist = true;
    }
  });
  if (productExist === true) {
    let result = await cartManager.updateCart(cid, cart);
    res.send({ status: "Success", payload: result });
  } else {
    res.send({
      status: 404,
      payload: "The product does not exist in the cart",
    });
  }
});

export default router;
