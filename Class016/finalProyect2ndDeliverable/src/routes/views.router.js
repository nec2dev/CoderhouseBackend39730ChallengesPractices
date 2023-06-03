import { Router } from "express";
import CartManager from "../dao/managers/cart.manager.js";
import MessageManager from "../dao/managers/message.manager.js";
import ProductManager from "../dao/managers/product.manager.js";
import productModel from "../dao/models/product.model.js";
import cartModel from "../dao/models/cart.model.js";

const router = Router();
const cartManager = new CartManager();
const messageManager = new MessageManager();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/products", async (req, res) => {
  const isLogin = req.session.user ? true : false;
  const user = req.session.user;
  const { page = 1, limit = 5, sort, category = "" } = req.query;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productModel.paginate(
      { category: { $regex: category } },
      { sort: { price: sort }, limit, page, lean: true }
    );

  const products = docs;
  res.render("products", {
    isLogin,
    user,
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    page,
  });
});

router.get("/product/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById({ _id: pid });
  const productRender = product[0];
  console.log(productRender);
  console.log(product);
  return res.render("product", { productRender });
});

router.get("/carts", async (req, res) => {
  let carts = await cartManager.getCarts();
  console.log(carts);
  res.render("carts", { carts });
});

router.get("/carts/:cid", async (req, res) => {
  let cid = req.params.cid;
  let cart = await cartModel.findById(cid).populate("products.product").lean();
  let cartProducts = cart.Products;
  console.log(cartProducts);
  res.render("carts", { cart, cartProducts });
});

router.get("/messages", async (req, res) => {
  let messages = await messageManager.getMessages();
  console.log(messages);
  res.render("messages", { messages });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.send("logout success!");
});

export default router;
