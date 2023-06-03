import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export default class CartManager {
  constructor() {
    console.log("Working in mongoDB with Carts");
  }

  createCart = async () => {
    const carts = await cartModel.find().lean().populate('user');
        return carts;
    }

  getCarts = async () => {
    const carts = await cartModel.find().lean().populate("products.product");
    return carts;
  };

  getCartById = async (cid) => {
    const cartExist = await cartModel
      .findOne({ _id: cid })
      .populate("products.product")
      .lean();
    return cart;
  };

  updateCart = async (cid, cart) => {
    let result = await cartModel.updateOne({ _id: cid }, cart);
    return result;
  };

  deleteCart = async (id) => {
    let result = await cartModel.findByIdAndDelete(id);
    return result;
  };

  deleteProductFromCart = async (cid, pid) => {
    let result = await cartModel.updateCart(
      { _id: cid },
      { $pull: { products: { product: pid } } }
    );
    return result;
  };

  addProductToCart = async (cid, pid, qty) => {
    try {
      const cartFound = await cartModel.findById({ _id: cid });
      if (!cartFound)
        return {
          status: 404,
          error: `Cart with id ${cid} not found`,
        };
      const productFound = await productModel.findById({ _id: pid });
      if (!productFound)
        return {
          status: 404,
          error: `Product with id ${pid} not found`,
        };
      let productIndex = cartFound.products.findIndex((p) => p.product === pid);
      if (productIndex != -1) {
        let updateProducts = cartFound;
        updateProducts.products[productIndex].quantity++;
        return await cartModel.findByIdAndUpdate(cid, {
          products: updateProducts.products,
        });
      } else {
        return await cartModel.findByIdAndUpdate(cid, {
          $push: { products: { product: pid, quantity: qty } },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  emptyCart = async (cid) => {
    let result = await cartModel.updateCart(
      { _id: cid },
      { $set: { products: [] } }
    );
    return result;
  };
}
