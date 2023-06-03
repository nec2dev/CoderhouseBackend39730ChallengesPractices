import CartManager from "../dao/managers/cart.manager.js";
import ProductManager from "../dao/managers/product.manager.js";

const cartManager = new CartManager();
const productManager = new ProductManager();

const getCarts = async (req, res) => {
  let carts = await cartManager.getAll();
  res.send({ status: "success", payload: carts });
};

const saveCart = async (req, res) => {
  const { products, user } = req.body;
  let newCart = { products, user };
  const result = await cartManager.saveCart(newCart);
  res.send({ status: "success", payload: result });
};

const addProductToCart = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let result = await cartManager.addProductToCart(cid, pid);
  res.send({ status: "success", payload: result });
};

const deleteProdFromCart = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let productExist = await productManager.getOne(pid);
  if (!productExist) {
    res.send({ status: 404, message: "El producto no existe" });
  } else {
    let cart = await cartManager.getOne(cid);
    if (!cart) {
      res.send({ status: 404, message: "El carrito no existe" });
    } else {
      let productInCartIndex = cart.products.findIndex(
        (p) => p.product === pid
      );
      if (productInCartIndex == -1) {
        res.send({
          status: 404,
          message: "El producto no existe dentro del carrito",
        });
      } else {
        cart.products.splice(productInCartIndex, 1);
        let result = await cartManager.updateCart(cid, cart);
        res.send({ status: "Ok", payload: result });
      }
    }
  }
};

const updateCart = async (req, res) => {
  let cid = req.params.cid;
  let products = req.body;
  let cart = await cartManager.getOne(cid);
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
};

const updateProductQuantity = async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let { quantity } = req.body;
  let cart = await cartManager.getOne(cid);
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
    res.send({ status: 404, payload: "El producto no existe en el carrito" });
  }
};

const deleteAllProdFromCart = async (req, res) => {
  const cid = req.params.cid;
  let cart = await cartManager.getOne(cid);
  cart.products = [];
  let result = await cartManager.updateCart(cid, cart);
  res.send({ status: "Success", payload: result });
};

export default {
  getCarts,
  saveCart,
  addProductToCart,
  deleteProdFromCart,
  updateCart,
  updateProductQuantity,
  deleteAllProdFromCart,
};
